import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            color: #ffffff;
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-close-icon {
            color: #ffffff;
        }
    `],
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
  showSideMenu: boolean = true;

  constructor(private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if(!this.currentUser.passwordIsChanged)
        this.showDialog = true;
      });
    this.changePasswordForm = this.formBuilder.group({
      oldpassword:new FormControl('',Validators.compose( [Validators.required])),
      newpassword: new FormControl('',Validators.compose([ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      confirmpassword: new FormControl('',Validators.compose( [Validators.required])),
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
    return;
    this.loading = true;
    this.userService.changePassword(this.currentUser.username, this.f.newpassword.value, this.f.oldpassword.value).pipe()
      .subscribe(
        data => {
          this.showSuccess('Change Password', 'Password has been changed successful.');
          this.showDialog = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  showSuccess(title: string,detail: string ) {
    this.messageService.addAll([{severity:'success', summary: title, detail:detail}]);
}


}
