import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CreateComponent } from './reservations/create/create.component';
import { ListComponent } from './reservations/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'reservations', pathMatch: 'full' },
  { path: '', component: LayoutComponent,
    children: [
      { path: 'reservations', component: ListComponent },
      { path: 'reservations/create', component: CreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
