import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {MenuItem} from 'primeng/api';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  private items: MenuItem[];
  home: MenuItem;

  constructor( 
    private userService: UserService,
    private authenticationService: AuthenticationService) { 
          this.currentUser = this.authenticationService.currentUserValue;
        }

  ngOnInit() {
    this.items = [
      {label:'Dashborad'}];
      this.home = {icon: 'pi pi-home'};
    this.loading = true;       
  }

}
