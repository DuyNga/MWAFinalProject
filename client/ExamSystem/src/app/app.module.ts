import { RoleGuardService } from './guard/role-guard.service';
import { GuardGuard } from './guard/guard.guard';
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
import { CrudQuestionComponent } from './questions/crud-question/crud-question.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { CrudInvitationComponent } from './invitations/crud-invitation/crud-invitation.component';
import { AgreementComponent } from './exam/agreement/agreement.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    CrudUserComponent,
    CrudQuestionComponent,
    InvitationsComponent,
    CrudInvitationComponent,
    AgreementComponent,
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
  providers: [GuardGuard],
  entryComponents: [CrudUserComponent, CrudQuestionComponent, AgreementComponent
  , CrudInvitationComponent, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
