import { LandComponent } from '../components/assetregister/addassetregister/land/land.component';
import { MapCoordinate } from './map-oordinate.model';

export class Facility {
    Id: Number;
    name: string;
    fileReference: string;
    facilityType: string;
    clientCode: string;
    propType: string;
    parcel: string;
    portion: string;
    farmName: string;
    landLoc: string;
    type: string;
    valuationDate: Date;
    SGDiagram: string;
    areaHA: string;
    regOwner: string;
    ownershipCategory: string;
    zoning: string;
    regDivision: string;
    userDept: string;
    conditionRating: string;
    intendUseOfTheProperty: string;
    currentUse: string;
    mapCoordinate: MapCoordinate;
    vestingInformation: string;
    comments: string;
    userId: Number;
    status: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate?: Date;    
    land: Land;
    financial: Financial;
    improvement: Improvement;
}

export class Land {
    geographicalLocation: GeographicalLocation;   
    propertyDescription: PropertyDescription;
    landUseManagementDetail: LandUseManagementDetail;
    leaseStatus: LeaseStatus;
}

export class Financial {

};

export class Improvement {

};

export class GeographicalLocation{
    province: any;   
}

export class PropertyDescription{
    registrationDivision: any;
    howAcquired: any;
}

export class LandUseManagementDetail{
    
}

export class LeaseStatus{
    
}