import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../services/results.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: any[] | undefined;
  list: any[] | undefined;
  constructor(private resultsService: ResultsService) {}
  ngOnInit(): void {
    this.getAllResults();
    this.getResultsGroupByYearAndOrderBySubject();
  }
  getResultsGroupByYearAndOrderBySubject(): void {
    this.resultsService.getAllResultsGroupBy(() => 'year').subscribe( (res: any) => {
        this.results = [...this.resultsService.mapData(res)];
    });
  }
  getAllResults(): void {
    this.resultsService.getAllResults().subscribe((data) => {
      this.list = [...data];
    });
  }
}
