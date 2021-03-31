import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './reservations/list/list.component';
import { CreateComponent } from './reservations/create/create.component';


@NgModule({
  declarations: [LayoutComponent, ListComponent, CreateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
