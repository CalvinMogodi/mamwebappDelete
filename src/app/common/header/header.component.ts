import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  showSettings: boolean = false;
  showDialog: boolean = false;
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: User;
  
  constructor(private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.showSuccess();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if(!this.currentUser.passwordIsChanged)
        this.showDialog = true;
      });
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  get f() { return this.changePasswordForm.controls; }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    this.loading = false;
    this.error = '';
    // stop here if form is invalid
    if (this.changePasswordForm.invalid || (this.f.newpassword.value !== this.f.confirmpassword.value)) {
      return;
    }
    this.loading = true;
    this.userService.changePassword(this.currentUser.username, this.f.newpassword.value, this.f.oldpassword.value).pipe()
      .subscribe(
        data => {
          this.showSuccess();
          this.showDialog = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Change Password', detail:'Password has been changed successful.'});
}

}
