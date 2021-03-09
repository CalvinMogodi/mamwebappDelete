import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  forgotPasswordForm: FormGroup;
  showDialog: boolean = false;
  forgotPasswordError = '';
  forgotPasswordLoading = false;
  forgotPasswordSubmitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // convenience getter for easy access to form fields
  get ff() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = false;
    this.error = '';
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.username != null){
            this.router.navigate(['dashboard']);
          }else{
            this.error = 'Invalid username or password';
            this.loading = false;
          }
          
        },
        catchError =>(error =>  {
          this.error = error;
          this.loading = false;
        }));
  }

  onForgotPasswordSubmit(){
    this.forgotPasswordSubmitted = true;
    this.forgotPasswordLoading = false;
    this.forgotPasswordError = '';
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.forgotPasswordLoading = true;
    var randomstring = Math.random().toString(36).slice(-8);
    this.userService.forgotpassword(this.ff.username.value, randomstring).pipe(first()).subscribe(isUpdated => {
      if (isUpdated) {
        this.showDialog = false;
        this.showToast('Forgot Password', 'Please check your email to change your passsword');
        this.forgotPasswordLoading = false;
      } else {
        this.forgotPasswordError = 'This username do not exist.';
        this.forgotPasswordLoading = false;
      }
    });
  }

  showToast(summary: string, detail: string) {
    this.messageService.add({severity:'success', summary:summary, detail:detail});
  }

}
