import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './reservations/list/list.component';
import { NgxEditorModule } from "ngx-editor";
import { CreateComponent } from './reservations/create/create.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, ListComponent, CreateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
