import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {MenuItem, MessageService} from 'primeng/api';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import {Message} from 'primeng//api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  , providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  private items: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

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
