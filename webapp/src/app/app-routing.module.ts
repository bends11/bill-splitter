import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PersonListComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'add-item/:name', component: AddItemComponent },
  { path: 'summary', component: SummaryComponent },
]


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
