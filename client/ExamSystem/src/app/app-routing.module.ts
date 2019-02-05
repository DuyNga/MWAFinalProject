import { GuardGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { QuestionsComponent } from './questions/questions.component';
import { AuthService } from './login/auth.service';

const routes: Routes = [
  {path: 'admin/users', component: UsersComponent, canActivate: [GuardGuard]},
  {path: 'admin/questions', component: QuestionsComponent, canActivate: [GuardGuard]},
  {path: 'index', component: HomeComponent},
  {path: 'login', component: LoginComponent}
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
export const routingComponent = [UsersComponent, QuestionsComponent, HomeComponent, LoginComponent];
