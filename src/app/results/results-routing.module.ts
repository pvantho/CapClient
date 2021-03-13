import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultsComponent} from './results.component';

import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: ResultsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
