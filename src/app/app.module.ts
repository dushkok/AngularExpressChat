import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {UsersComponent} from './users/users.component';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatTabsModule} from "@angular/material";
import {DialogComponent} from "./dialog/dialog.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
