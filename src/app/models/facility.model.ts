import { LandComponent } from '../components/assetregister/addassetregister/land/land.component';
import { MapCoordinate } from './map-oordinate.model';

export class Facility {
    deedsOffice: string;
    id: Number;
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
    deedOffice: string;
    assetClass: string;
    assetType: string;
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
    province: string;
    town: string;
    suburb: string;
    streetName: string;
    streetNumber: number;
    districtMunicipality: string;
    region: string;
    localAuthority: string;
    latitude: string;
    longitude: string; 
    magisterialDistrict: string;
}

export class PropertyDescription{   
    registrationDivision: string;
    townshipName: string;
    landParcel: string;
    landPortion: string;
    oldDescription: string;
    landRemainder: boolean;
    farmName: string;
    SGDiagramNumber: number;
    extent: number;
    LPICode: string;
    acquired: string;
    acquiredOther: string;  
}

export class LandUseManagementDetail{
    titleDeedNumber: string;
    registrationDate: Date;
    registeredOwner: string;
    vestingDate: Date;
    conditionsOfTitle: string;
    ownershipCategory: string;
    stateOwnedPercentage: number;
    landUse: string;
    zoning: string;
    userDepartment: string;
    facilityName: string; 
    incomeLeaseStatus: string;
}

export class LeaseStatus{    
    natureOfLease: string;
    IDNumberCompanyRegistrationNumber: number;
    POBox: string;
    contactNumber: string;
    capacityofContactPerson: string;
    contactPerson: string;
    postalCode: number;
    leaseStatusTown: string;
    rentalAmount: number;
    terminationDate: Date;
    startingDate: Date;
    occupationDate: Date;
    escalation: string;
    vat: string;
    leaseNumber: number;
    otherCharges: number;
}
