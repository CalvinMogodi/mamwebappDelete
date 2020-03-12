import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from '../app/helpers/auth.guard';
import { Role } from '../app/models/role.model';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashborad',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },{
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,    
  },{ path: '**', redirectTo: 'dashborad' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
