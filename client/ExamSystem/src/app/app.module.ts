import { GuardGuard } from './guard.guard';
import { CrudUserComponent } from './users/crud-user/crud-user.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { routingComponent, AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './meterial.module';
import {MatNativeDateModule} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './login/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    CrudUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  entryComponents: [CrudUserComponent],
  providers: [AuthService, GuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
