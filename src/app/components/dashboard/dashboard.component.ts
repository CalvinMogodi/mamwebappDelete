import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {MenuItem, MessageService} from 'primeng/api';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { FacilityService } from '../../services/facility/facility.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Message} from 'primeng//api';
import { FacilityZoning } from 'src/app/models/Facility-zoning';
import { FacilityType } from 'src/app/models/facility-type.model';
import { DashboardWedge } from 'src/app/models/dashboard-wedge.model';
import { facilitySummaryChart } from 'src/app/models/facility-summary-chart.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  , providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  loadingZonings = true;
  loadingWedges = true;
  loadingFacilitySummaries = true;
  zonings: Array<FacilityType> = [];
  facilityType: FacilityType;
  wedges: Array<DashboardWedge> = [];
  currentUser: User;
  userFromApi: User;
  private items: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  data: any;
  nonResidentialBuildings: any;
  dwellings: any;
  land: any;
  barChartdata: any;
  lineChartdata: any;
  numberofProperties: any;
  signedoffProperties: any;
  facilitySummaries: Array<facilitySummaryChart> = [];  

  constructor( 
    private userService: UserService,
    private facilityService: FacilityService,
    private authenticationService: AuthenticationService) { 
          this.currentUser = this.authenticationService.currentUserValue;
        }

  ngOnInit() {
    this.items = [{label:'Welcome back to your dashboard'}];
    this.home = {icon: 'pi pi-home'};      
    
    this.facilityService.getFacilityZonings().pipe(first()).subscribe(zonings => {
      this.loadingZonings = false;
      this.zonings = zonings;
      this.facilityType = this.zonings[0];
      this.barChartdata = {
        labels: ['Non Residential Buildings','Dwellings','Land'],
        datasets: [
            {
                data: [this.nonResidentialBuildings.total, this.dwellings.total, this.land.total],
                backgroundColor: [
                    "#147df0",
                    "#ed3c76",
                    "#599597"
                ],
                hoverBackgroundColor: [
                    "#147df0",
                    "#ed3c76",
                    "#599597"
                ]
            }]    
        };
    });

    this.facilityService.getFacilitySummaries().pipe(first()).subscribe(facilitySummaries => {
      this.loadingFacilitySummaries = false;
      this.facilitySummaries = facilitySummaries;
      this.lineChartdata = {
        labels: ['Opening Balance','Additions','PPeaIn', 'PPeaOut', 'Disposals','Closing Balance'],
        datasets: [
          {
            label: facilitySummaries[1].facilitySummaries[0].facilityType,
            backgroundColor: '#ed3c76',
            borderColor: '#1E88E5',
            data: [facilitySummaries[1].facilitySummaries[0].openingBalance
            , facilitySummaries[1].facilitySummaries[0].additions
            , facilitySummaries[1].facilitySummaries[0].ppeaIn
            , facilitySummaries[1].facilitySummaries[0].ppeaOut
            , facilitySummaries[1].facilitySummaries[0].disposals
            , facilitySummaries[1].facilitySummaries[0].closingBalance]
           
        },
        {
          label: facilitySummaries[1].facilitySummaries[1].facilityType,
            data: [facilitySummaries[1].facilitySummaries[1].openingBalance
            , facilitySummaries[1].facilitySummaries[1].additions
            , facilitySummaries[1].facilitySummaries[1].ppeaIn
            , facilitySummaries[1].facilitySummaries[1].ppeaOut
            , facilitySummaries[1].facilitySummaries[1].disposals
            , facilitySummaries[1].facilitySummaries[1].closingBalance],
            fill: false,
            backgroundColor: '#42A5F5',
            borderColor: '#7CB342',
        },
        {
          label: facilitySummaries[1].facilitySummaries[2].facilityType,
            data: [facilitySummaries[1].facilitySummaries[2].openingBalance
            , facilitySummaries[1].facilitySummaries[2].additions
            , facilitySummaries[1].facilitySummaries[2].ppeaIn
            , facilitySummaries[1].facilitySummaries[2].ppeaOut
            , facilitySummaries[1].facilitySummaries[2].disposals
            , facilitySummaries[1].facilitySummaries[2].closingBalance],
            fill: false,
            backgroundColor: '#599597',
            borderColor: '#599597'
        }
      ]    
        };
    });

    this.facilityService.getDashboardWedges().pipe(first()).subscribe(wedges => {
      this.loadingWedges = false;
      this.wedges = wedges;
      this.nonResidentialBuildings = this.wedges.filter(w => w.name == "Non Residential Buildings")[0];
      this.dwellings = this.wedges.filter(w => w.name == "Dwellings")[0];
      this.land = this.wedges.filter(w => w.name == "Land")[0];
      this.signedoffProperties = this.wedges.filter(w => w.name == "Signed off properties")[0];
      this.numberofProperties = this.wedges.filter(w => w.name == "Number of properties")[0];
      
      this.data = {
        labels: ['Non Residential Buildings','Dwellings','Land', 'Number of properties', 'Signed off properties'],
        datasets: [
            {
                data: [this.nonResidentialBuildings.total, this.dwellings.total, this.land.total, this.numberofProperties.total, this.signedoffProperties.total],
                backgroundColor: [
                    "#147df0",
                    "#ed3c76",
                    "#599597",
                    "#fdde60",
                    "#66cfb6"
                ],
                hoverBackgroundColor: [
                    "#147df0",
                    "#ed3c76",
                    "#599597",
                    "#fdde60",
                    "#66cfb6"
                ]
            }]    
        };
    });
  }

}
