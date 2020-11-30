import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addassetregister',
  templateUrl: './addassetregister.component.html',
  styleUrls: ['./addassetregister.component.css']
})
export class AddassetregisterComponent implements OnInit {
  steps: MenuItem[];
  subscription: Subscription;
  activeItem: MenuItem;
  constructor() { }

  ngOnInit() {
    this.steps = [
      {label: 'Land', icon: 'pi pi-fw pi-globe'},
      {label: 'Financials', icon: 'pi pi-fw pi-money-bill'},
      {label: 'Impronements', icon: 'pi pi-fw pi-home'}
  ];
  this.activeItem = this.steps[0];
  }

}
