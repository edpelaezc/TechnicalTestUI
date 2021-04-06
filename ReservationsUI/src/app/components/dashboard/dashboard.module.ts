import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './reservations/list/list.component';
import { NgxEditorModule } from "ngx-editor";
import { CreateComponent } from './reservations/create/create.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ContactsEditComponent } from './contacts/edit/edit.component';
import { ContactsCreateComponent } from "./contacts/create/create.component";
import { ContactsListComponent } from "./contacts/list/list.component";


@NgModule({
  declarations: [LayoutComponent, ListComponent, CreateComponent, ContactsEditComponent, ContactsCreateComponent, ContactsListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class DashboardModule { }
