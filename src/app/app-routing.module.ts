import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '' , redirectTo: 'results', pathMatch: 'full'},
  { path: 'results', loadChildren: () => import('./results/results-routing.module').then( (m) =>  m.ResultsRoutingModule )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
