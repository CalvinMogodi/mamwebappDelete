import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserComponent implements OnInit {
  loading = false;
  isAdding = false;
  users: User[] = [];
  clonedUsers: User[] = [];
  cols: any[];
  items: MenuItem[];
  home: MenuItem;
  addUserForm: FormGroup;
  submitted = false;
  error = '';
  emailExsist: boolean = false;
  currentUser: User;
  resetUser: User;
  showDialog: boolean = false;
  showConfirmResetPassword: boolean = false;
  msgs: any[] = [];
  newUserError: string = '';
  errorMsg:string = 'error';

  constructor(private userService: UserService,    
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private changeDetectionRef: ChangeDetectorRef) { }
    roles: any[];

  ngOnInit() {
    this.showToast('Update User', 'User has been updated successful.');
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });

    this.roles = [    
      { name: 'Viewer', code: 'V', factor: 1 },
      { name: 'Administrator', code: 'SA', factor: 2 },
      { name: 'Capturer', code: 'C', factor: 3 },
      { name: 'Approver', code: 'A', factor: 4 },
      { name: 'Verifier', code: 'DV', factor: 5 },
      { name: 'Manager', code: 'M', factor: 6 },
      
    ];

    this.addUserForm = this.formBuilder.group({
      name: new FormControl('',Validators.compose( [Validators.required])),
      surname: new FormControl('',Validators.compose( [ Validators.required])),
      email: new FormControl('',Validators.compose( [Validators.required, Validators.email])),
      role: new FormControl('',Validators.compose( [Validators.required])),
    });

    this.items = [
      { label: 'Dashboard', url: 'dashboard' },
      { label: 'Users' }];
    this.home = { icon: 'pi pi-home' };
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'surname', header: 'Surname' },
      { field: 'email', header: 'Email' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'role', header: 'Role', element: true },
      { field: 'isActive', header: 'Active' }
    ];

    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
      this.clonedUsers = users;
    });
  }

  get f() { return this.addUserForm.controls; }

  onRowEditSave(user: User) {
    if (user.name === undefined || user.name === '') {
      return;
    }

    if (user.surname === undefined || user.surname === '') {
      return;
    }

    if (this.validEmail(user.email, user.id)) {
      return;
    }

    this.userService.updateUser(user).pipe(first()).subscribe(isUpdated => {
      if (isUpdated) {
        this.showToast('Update User', 'User has been updated successful.');
        this.loading = false;
      } else {
        this.showErrorToast('Update User', 'User has not been updated successful.');
        this.loading = false;
      }
    });
  }

  validEmail(str : string, id: number) {
    var email = str == undefined ? this.f.email.value : str;
    if(id != undefined){//for edit
      if(str === undefined || str === '')
        return false
      else
       return this.users.filter(u => u.email.toLowerCase() == email.toLowerCase() && u.id != id).length > 0;
    }else{ //for add      
      return this.users.filter(u => u.email.toLowerCase() == email.toLowerCase()).length > 0 ? this.emailExsist = true : this.emailExsist = false;
    }    
  }

  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.id];
  }

  showToast(summary: string, detail: string) {
    this.messageService.add({severity:'success', summary:summary, detail:detail});
  }
  showErrorToast(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: detail });
  }

  setDeedsOffice(e){}

  onRowEditInit(e) { }

  onSubmit() {
    this.submitted = true;
    this.isAdding = false;  
    
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    
    return;
    var randomstring = Math.random().toString(36).slice(-8);

    this.isAdding = true;
    var user: User = {
      id: undefined,
      username: this.f.email.value,
      password: randomstring,
      name: this.f.name.value,
      surname: this.f.surname.value,
      roleId: this.addUserForm.controls["role"].value.factor,
      isActive: true,
      email: this.f.email.value,
      passwordIsChanged: false,
      createdDate: new Date, 
      createdUserId: this.currentUser.id
    }
    this.userService.addUser(user).pipe()
      .subscribe(
        newUser => {
          this.users.push(newUser);
          this.showDialog = false;
          this.isAdding = false;
          this.showToast('Add User', 'User has been added successful');
        },
        error => {
          this.error = error;
          this.isAdding = false;
        });
  }

  confirm1(user) {
    this.resetUser = user;
    this.confirmationService.confirm({
        message: 'Are you sure that you want to reset password?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          var randomstring = Math.random().toString(36).slice(-8);
          this.userService.resetPassword(user.username, randomstring).pipe(first()).subscribe(isUpdated => {
            if (isUpdated) {
              this.showToast('Reset Password','Please check your email to reset your password');
              this.loading = false;
            } else {
              this.showErrorToast('Reset Password', 'Failed to reset your password.');
              this.loading = false;
            }
          });
           
        },
        reject: () => {
        }
    });
}

}
