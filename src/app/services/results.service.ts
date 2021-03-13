import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Subject, Result} from '../model/subject';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';

import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  baseUrl = environment.url;
  constructor(private httpClient: HttpClient) { }

  getAllResults(): Observable<Subject[]> {
   return this.httpClient.get<Subject[]>(this.baseUrl);
   // return this.getData();
  }
  /* getData(): Observable<Subject[]> {
    const data = [
      {subject: 'Advanced Taxation', results: [{year: 2016, grade: 'PASS'}]},
      {subject: 'Financial Risk Management', results: [{year: 2015, grade: 'PASS'}]},
      {subject: 'Strategic Management Accounting', results: [{year: 2015, grade: 'FAIL'}, {year: 2016, grade: 'PASS'}]},
      {subject: 'Financial Reporting', results: [{year: 2015, grade: 'FAIL'}, {year: 2016, grade: 'PASS'}]}];

    return of(data);
  }*/
  reduceMe(items: any[], key: any): any  {
        return items.reduce( (result, item) => ({
          ...result,
          [item[key]]: [
          ...(result[item[key]] || []),
          item,
          ],
          }),
        {},
        );
  }
  grabPassedGradeOnly(data: any[]): any {
    return data.map( (x: Subject) => {
      const { subject } = x;
      const res: Result | undefined = x.results?.filter( (y: any) => y.grade === 'PASS').shift();
      return { year: res?.year, subject };
    });
  }
  groupByKey(ds: Observable<any>, k: any, reduceMe: (items: any[], key: any) => any): any {
    return ds.pipe(
      map( (data: any[]) => {
        return  reduceMe(this.grabPassedGradeOnly(data), k);
      }),
      catchError( (error) => {
        return [];
      }));
  }
  // Helper method to group results by key property
  getAllResultsGroupBy(key: () => any): any {
    return this.groupByKey(this.getAllResults(), key(), this.reduceMe);
  }
  mapData(ds: any): any[] {
    const result: any[] = [];
    Object.keys(ds).map( (key) => {
      const list: any[] = ds[key];
      list.sort( ( a: any, b: any ) => a.subject < b.subject ? -1 : (a.subject > b.subject ? 1 : 0));
      const subjects  = list.map( x => x.subject);
      result.push({year: key, subjects});
    });
    return result;
  }
}
