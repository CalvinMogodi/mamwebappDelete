import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './common/login/login.component';
import { AssetregisterComponent } from './components/assetregister/assetregister.component';
import { AuthGuard } from '../app/helpers/auth.guard';
import { Role } from '../app/models/role.model';
import { FinancialsComponent } from './components/assetregister/addassetregister/financials/financials.component';
import { ImprovementsComponent } from './components/assetregister/addassetregister/improvements/improvements.component';
import { LandComponent } from './components/assetregister/addassetregister/land/land.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },{
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard],
  },{
    path: 'assetregister',
    component: AssetregisterComponent,
    canActivate: [AuthGuard],
  },  
  {
    path: 'addland',
    component: LandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addimprovement',
    component: ImprovementsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addfinancial',
    component: FinancialsComponent,
    canActivate: [AuthGuard],
  },  
  {
    path: 'login',
    component: LoginComponent,    
  },{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
