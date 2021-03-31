import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const DashboardModule = () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule);
const routes: Routes = [
  { path: '', loadChildren: DashboardModule }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
