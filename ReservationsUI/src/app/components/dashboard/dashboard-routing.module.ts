import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CreateComponent } from './reservations/create/create.component';
import { ListComponent } from './reservations/list/list.component';
import { ContactsListComponent } from "./contacts/list/list.component";
import { ContactsCreateComponent } from "./contacts/create/create.component";
import { ContactsEditComponent } from "./contacts/edit/edit.component";
import { EditComponent } from './reservations/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'reservations', pathMatch: 'full' },
  { path: '', component: LayoutComponent,
    children: [
      { path: 'reservations', component: ListComponent },
      { path: 'reservations/create', component: CreateComponent },
      { path: 'reservations/edit/:id', component: EditComponent },
      { path: 'contacts/list', component: ContactsListComponent },
      { path: 'contacts/create', component: ContactsCreateComponent },
      { path: 'contacts/edit/:id', component: ContactsEditComponent }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
