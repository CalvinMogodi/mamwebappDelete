import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../app/services/authentication.service';
import { User } from '../app/models/user.model';
import { Role } from '../app/models/role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.pipe().subscribe(x => {
      this.currentUser = x;
      this.loggedIn = this.currentUser == null ? false : true;
      if(this.currentUser != null)  {
        this.loggedIn = this.currentUser.id == 0 ? false : true;
      }
      if(!this.loggedIn){       
        this.router.navigate(['login']);
      }
        
    }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isAdmin() {
    if(this.currentUser.role != null)
      return this.currentUser && (this.currentUser.role.id === 2 || this.currentUser.role.id === 4);
    else
      return false;
  }
}
