import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FacilityType } from '../../models/facility-type.model';
import { DashboardWedge } from '../../models/dashboard-wedge.model';
import { facilitySummaryChart } from 'src/app/models/facility-summary-chart.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getFacilityZonings() {
    return this.http.get<FacilityType[]>(`${environment.apiUrl}/api/facility/getfacilityzonings`);
  }

  getDashboardWedges() {
    return this.http.get<DashboardWedge[]>(`${environment.apiUrl}/api/facility/getdashboardwedges`);
  }

  getFacilitySummaries() {
    return this.http.get<Array<facilitySummaryChart>>(`${environment.apiUrl}/api/facility/getfacilitysummaries`);
  }
}