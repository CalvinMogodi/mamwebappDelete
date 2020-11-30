import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  roles: any[];
  constructor() { }

  ngOnInit() {

    this.roles = [
      { name: 'IT Administrator', code: 'A', factor: 1 },
      { name: 'Data Capturer', code: 'C', factor: 2 },
      { name: 'Data Approver', code: 'A', factor: 3 },
      { name: 'Data Manager', code: 'M', factor: 4 },
    ];
  }

}
