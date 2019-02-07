import { RoleGuardService } from './guard/role-guard.service';
import { GuardGuard } from './guard/guard.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { QuestionsComponent } from './questions/questions.component';
import { AuthService } from './login/auth.service';
import { InvitationsComponent } from './invitations/invitations.component';
import { ExamComponent } from './exam/exam.component';

const routes: Routes = [
  {path: 'admin/questions', component: QuestionsComponent, canActivate: [GuardGuard]},
  {path: 'admin/users', component: UsersComponent, canActivate: [GuardGuard], data: {role: '1'}},
  {path: 'admin/invitations', component: InvitationsComponent, canActivate: [GuardGuard]},
  {path: 'index', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'exam/:token', component: ExamComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [UsersComponent, QuestionsComponent, HomeComponent, LoginComponent, ExamComponent];
