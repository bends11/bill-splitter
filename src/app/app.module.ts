import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { BaseComponent } from './pages/base/base.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { ItemNameTakenComponent } from './modals/item-name-taken/item-name-taken.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    ItemListComponent,
    BaseComponent,
    AddItemComponent,
    SummaryComponent,
    ItemNameTakenComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressBarModule,
    ClipboardModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
