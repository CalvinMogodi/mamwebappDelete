import { Component, OnInit, Input, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { Facility } from 'src/app/models/facility.model';
import { FacilityService } from 'src/app/services/facility/facility.service';

@Component({
  selector: 'app-addassetregister',
  templateUrl: './addassetregister.component.html',
  styleUrls: ['./addassetregister.component.css']
})

export class AddassetregisterComponent implements OnInit {
  
  @Input() selectedAsset:any;
  steps: MenuItem[];
  landisSubmitted: boolean = false;
  generalInformation: {
    deedsOffice: '',
    class: '',
    type: ''
  };
  error = '';  
  newCaptured = 0;
  awaitingAppoval = 0;
  awaitingVerification = 0;
  items = [
    { label: 'Dashboard', url: 'dashboard' },
    { label: 'Asset Register' }];
  cols = [
    { field: 'fileReference', header: 'File Reference' },
    { field: 'clientCode', header: 'Property Code' },
    { field: 'status', header: 'Status' }
  ];
  improvementCols = [
    { field: 'buildingName', header: 'Building Name' },
    { field: 'type', header: 'Type' },
    { field: 'size', header: 'Size' }
  ];
 
  subscription: Subscription;
  activeItem: MenuItem;
  loading = true;
  incomeLeaseStatuses: any[];
  natureOfLeases: any[];
  showDialog: boolean = false;
  activeIndex: number = 0;
  landForm: FormGroup;
  financialForm: FormGroup;
  improvementForm: FormGroup;
  deedsOffices: any[];
  typeOfImprovements: any[];
  potentialUseList: any[];
  classes: any[];
  regions: any[];
  types: any[];

  submitted = false;
  localAuthorities: any[];
  registrationDivisions: any[];
  magisterialDistricts: any[];
  districtMunicipalities: any[];
  conditionRatings: any[];
  vats: any[];
  userDepartments: any[];
  landRemainders: any[];
  howAcquired: any[];
  provinces: any[];
  functionalPerformanceRatings: any[];
  ownershipCategories: any;
  errorMsg: string;
  mode: string;
  province: { name: 'Mpumalanga', code: 'MP', factor: 6 };
  registrationDivision: { name: 'Mpumalanga', code: 'M', factor: 4 };
  savingLand: boolean = false;
 

  facility: Facility
  
  financial: {};
  improvement: {}

  constructor(public facilityService: FacilityService, private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.buildForm();
    this.steps = [
    { label: 'Land', icon: 'pi pi-fw pi-globe' },
    { label: 'Financials', icon: 'pi pi-fw pi-money-bill' },
    { label: 'Impronements', icon: 'pi pi-fw pi-home' }
  ];
  this.activeItem = this.steps[0];

    if(this.selectedAsset.facilityId != undefined){
      this.mode = this.selectedAsset.mode;
      this.facilityService.getFacilityById(this.selectedAsset.facilityId, this.selectedAsset.facilityType).pipe(first()).subscribe(facility => {
        this.loading = false;
        this.facility = facility;
        this.assginfacility();       
    });
    }else{
      this.mode = this.selectedAsset.mode;
      this.loading = false;
    } 
  }

  get l() { return this.landForm.controls; }
  get f() { return this.financialForm.controls; }
  get I() { return this.improvementForm.controls; }

  setLocalAuthorities(e) { }

  setDistrictMunicipality(e) {
    if (e.value.factor == 1) {
      this.localAuthorities = [
        { name: 'Mbombela', code: 'M', factor: 1 },
        { name: 'Nkomazi', code: 'N', factor: 2 },
        { name: 'Thaba Chweu', code: 'TC', factor: 3 },
        { name: 'Bushbuckridge', code: 'B', factor: 4 }
      ];
    } else if (e.value.factor == 2) {
      this.localAuthorities = [
        { name: 'Emalahleni', code: 'E', factor: 1 },
        { name: 'Emakahzeni', code: 'E', factor: 2 },
        { name: 'DR JS Moroka', code: 'JSM', factor: 3 },
        { name: 'Thembisile Hani', code: 'TH', factor: 4 },
        { name: 'Victor Khanye', code: 'VK', factor: 5 }
      ];
    } else {
      this.localAuthorities = [
        { name: 'Goven Mbeki', code: 'GM', factor: 1 },
        { name: 'Albert Luthuli', code: 'AL', factor: 2 },
        { name: 'Lekwa', code: 'L', factor: 3 },
        { name: 'Dipaleseng', code: 'D', factor: 4 },
        { name: 'Pixley ka Seme', code: 'PKS', factor: 5 },
        { name: 'Mkhondo', code: 'M', factor: 6 },
        { name: 'Msukaligwa', code: 'MS', factor: 7 }
      ];
    }

  }

  setDeedsOffice(e) {

  }

  setHowAcquired(e) {

  }

  setVat(e) { }

  setProvince(e) { }

  setMagisterialDistrict(e) { }

  setClass(e) {

  }

  setConditionRating(e) { }

  setType(e) {

  }

  onFinancialFormSubmit() {

  }

  onImprovementFormSubmit() {

  }

  onLandFormSubmit() {
    this.landisSubmitted = true;
    if(this.landForm.valid){
      this.facility.land = {
        deedOffice: this.landForm.controls["deedsOffice"].value.name,
        assetType: this.landForm.controls["assetType"].value,
        assetClass: this.landForm.controls["assetClass"].value,
        geographicalLocation: {
          province: this.landForm.controls["province"].value.name,
          town: this.landForm.controls["town"].value,
          suburb: this.landForm.controls["suburb"].value,
          streetName: this.landForm.controls["streetName"].value,
          streetNumber: this.landForm.controls["streetNumber"].value,
          districtMunicipality: this.landForm.controls["districtMunicipality"].value,
          region: this.landForm.controls["region"].value,
          localAuthority: this.landForm.controls["localAuthority"].value,
          latitude: this.landForm.controls["latitude"].value,
          longitude: this.landForm.controls["longitude"].value,
          magisterialDistrict: this.landForm.controls["magisterialDistrict"].value,
        },
        propertyDescription: {
          registrationDivision: this.landForm.controls["registrationDivision"].value,
          townshipName: this.landForm.controls["townshipName"].value,
          landParcel: this.landForm.controls["landParcel"].value,
          landPortion: this.landForm.controls["landPortion"].value,
          oldDescription: this.landForm.controls["oldDescription"].value,
          landRemainder: this.landForm.controls["landRemainder"].value,
          farmName: this.landForm.controls["farmName"].value,
          SGDiagramNumber: this.landForm.controls["SGDiagramNumber"].value,
          extent: this.landForm.controls["extent"].value,
          LPICode: this.landForm.controls["LPICode"].value,
          acquired: this.landForm.controls["acquired"].value,
          acquiredOther: this.landForm.controls["acquiredOther"].value,
        },
        landUseManagementDetail: {
          titleDeedNumber: this.landForm.controls["titleDeedNumber"].value,
          registrationDate: this.landForm.controls["registrationDate"].value,
          registeredOwner: this.landForm.controls["registeredOwner"].value,
          vestingDate: this.landForm.controls["vestingDate"].value,
          conditionsOfTitle: this.landForm.controls["conditionsOfTitle"].value,
          ownershipCategory: this.landForm.controls["ownershipCategory"].value,
          stateOwnedPercentage: this.landForm.controls["stateOwnedPercentage"].value,
          landUse: this.landForm.controls["landUse"].value,
          zoning: this.landForm.controls["zoning"].value,
          userDepartment: this.landForm.controls["userDepartment"].value,
          facilityName: this.landForm.controls["facilityName"].value, 
          incomeLeaseStatus: this.landForm.controls["incomeLeaseStatus"].value,
        },
        leaseStatus: {
          natureOfLease: this.landForm.controls["natureOfLease"].value,
          IDNumberCompanyRegistrationNumber: this.landForm.controls["IDNumberCompanyRegistrationNumber"].value,
          POBox: this.landForm.controls["POBox"].value,
          contactNumber: this.landForm.controls["contactNumber"].value,
          capacityofContactPerson: this.landForm.controls["capacityofContactPerson"].value,
          contactPerson: this.landForm.controls["contactPerson"].value,
          postalCode: this.landForm.controls["postalCode"].value,
          leaseStatusTown: this.landForm.controls["leaseStatusTown"].value,
          rentalAmount: this.landForm.controls["rentalAmount"].value,
          terminationDate: this.landForm.controls["terminationDate"].value,
          startingDate: this.landForm.controls["startingDate"].value,
          occupationDate: this.landForm.controls["occupationDate"].value,
          escalation: this.landForm.controls["escalation"].value,
          vat: this.landForm.controls["vat"].value,
          leaseNumber: this.landForm.controls["leaseNumber"].value,
          otherCharges: this.landForm.controls["otherCharges"].value,
        }
      };

      this.facilityService.saveFacility(this.facility, 0).pipe(first()).subscribe(isSaved => {
        if(isSaved){
          this.savingLand = false;
          this.messageService.add({severity:'warn', summary:'Deleted', detail:'Asset is deleted successful.'});
         
        }
        else{
          this.savingLand = false;
          this.messageService.add({severity:'error', summary:'Error', detail:'An error occurred while delete asset.'});
        }     
      });

    }
  }

  onRowEditCancel(row, e) {

  }

  onSubmit() {
    this.showToast('Reset Password', 'Asset has been added successful');
    this.showDialog = false; // closes/hides the dialog box
  }

  buildForm() {
    this.landForm = this.formBuilder.group({
      deedsOffice: ['', Validators.required],
      class: ['', Validators.required],
      type: ['', [Validators.required]],
      province: ['', [Validators.required]],
      town: ['', [Validators.required]],
      suburb: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      districtMunicipality: ['', [Validators.required]],
      region: ['', [Validators.required]],
      localAuthority: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      registrationDivision: ['', [Validators.required]],
      townshipName: ['', [Validators.required]],
      landParcel: ['', [Validators.required]],
      landPortion: ['', [Validators.required]],
      oldDescription: ['', [Validators.required]],
      landRemainder: ['', [Validators.required]],
      farmName: ['', [Validators.required]],
      SGDiagramNumber: ['', [Validators.required]],
      extent: ['', [Validators.required]],
      LPICode: ['', [Validators.required]],
      acquired: ['', [Validators.required]],
      acquiredOther: [''],
      titleDeedNumber: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      registeredOwner: ['', [Validators.required]],
      vestingDate: ['', [Validators.required]],
      conditionsOfTitle: ['', [Validators.required]],
      ownershipCategory: ['', [Validators.required]],
      stateOwnedPercentage: ['', [Validators.required]],
      landUse: ['', [Validators.required]],
      zoning: ['', [Validators.required]],
      userDepartment: ['', [Validators.required]],
      facilityName: ['', [Validators.required]],
      incomeLeaseStatus: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      leaseNumber: ['', [Validators.required]],
      otherCharges: ['', [Validators.required]],
      rentalAmount: ['', [Validators.required]],
      terminationDate: ['', [Validators.required]],
      startingDate: ['', [Validators.required]],
      occupationDate: ['', [Validators.required]],
      escalation: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      capacityofContactPerson: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      leaseStatusTown: ['', [Validators.required]],
      POBox: ['', [Validators.required]],
      IDNumberCompanyRegistrationNumber: ['', [Validators.required]],
      natureOfLease: ['', [Validators.required]],
      magisterialDistrict: ['', [Validators.required]]
    });
    this.improvementForm = this.formBuilder.group({
      buildingName: ['', Validators.required],
      typeOfImprovement: ['', Validators.required],
      sizeofImprovement: ['', [Validators.required]],
      potentialUse: ['', [Validators.required]],
      town: ['', [Validators.required]],
      suburb: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      siteCoverag: ['', [Validators.required]],
      functionalPerformanceRating: ['', [Validators.required]],
      extentofBuilding: ['', [Validators.required]],
      conditionRating: ['', [Validators.required]],
      usableArea: ['', [Validators.required]],
    });
    this.financialForm = this.formBuilder.group({
      landUseClass: ['', Validators.required],
      natureofAsset: ['', Validators.required],
      additionCash: ['', [Validators.required]],
      dateofMunicipalValuation: ['', [Validators.required]],
      dateofNonMunicipalValuation: ['', [Validators.required]],
    });

    this.magisterialDistricts = [
      { name: 'Chief Albert Luthuli', code: 'CAL', factor: 1 },
      { name: 'Bushbuckridge', code: 'BB', factor: 2 },
      { name: 'Bohlabela', code: 'B', factor: 3 },
      { name: 'Dipaleseng', code: 'D', factor: 4 },
      { name: 'Dr JS Moroka', code: 'JSM', factor: 5 },
      { name: 'Emakhazeni ', code: 'EK', factor: 6 },
      { name: 'Emalahleni', code: 'E', factor: 7 },
      { name: 'Govan Mbeki', code: 'GM', factor: 8 },
      { name: 'Lekwa ', code: 'L', factor: 9 },
      { name: 'Mbombela', code: 'M', factor: 10 },
      { name: 'Mkhondo', code: 'MK', factor: 11 },
      { name: 'Msukaligwa', code: 'MS', factor: 12 },
      { name: 'Nkomazi', code: 'N', factor: 13 },
      { name: 'Dr Pixley ka Seme', code: 'PKS', factor: 14 },
      { name: 'Steve Tshwete', code: 'ST', factor: 15 },
      { name: 'Thaba Chweu', code: 'TC', factor: 16 },
      { name: 'Thembisile Hani', code: 'TH', factor: 17 },
      { name: 'Victor Khanye ', code: 'VK', factor: 18 },
      { name: 'Umjindi ', code: 'U', factor: 19 }
    ];

    this.userDepartments = [
      { name: 'Agriculture, rural development, land & environmental affairs', code: 'ARALEA', factor: 1 },
      { name: 'Economic development & tourism', code: 'EDT', factor: 2 },
      { name: 'Co-operative governance & traditional affairs', code: 'CGTA', factor: 3 },
      { name: 'Community safety, security & liason', code: 'CSSL', factor: 4 },
      { name: 'Culture, sport & recreation', code: 'CSR', factor: 5 },
      { name: 'Education', code: 'E', factor: 6 },
      { name: 'Provincial treasury', code: 'PT', factor: 7 },
      { name: 'Health', code: 'H', factor: 8 },
      { name: 'Human settlements', code: 'HS', factor: 9 },
      { name: 'Social development', code: 'SD', factor: 10 },
      { name: 'Publick works, roads & transport', code: 'PWRT', factor: 11 },
    ];
    this.registrationDivisions = [
      { name: 'Bloemfontein', code: 'B', factor: 1 },
      { name: 'Johannesburg', code: 'J', factor: 2 },
      { name: 'King Williams town', code: 'KWT', factor: 3 },
      { name: 'Mpumalanga', code: 'M', factor: 4 },
      { name: 'Pretoria ', code: 'P', factor: 5 },
      { name: 'Cape town', code: 'CT', factor: 6 },
      { name: 'Kimberly', code: 'K', factor: 7 },
      { name: 'Limpopo', code: 'L', factor: 8 },
      { name: 'Pietermaritzburg', code: 'P', factor: 9 },
      { name: 'Umtata', code: 'U', factor: 10 },
      { name: 'Vryburg', code: 'V', factor: 11 },
    ];

    this.ownershipCategories = [
      { name: 'State-Owned', code: 'SO', factor: 1 },
      { name: 'Non-State Owned', code: 'NSO', factor: 2 },
    ];
    this.classes = [
      { name: 'Urban', code: 'U', factor: 1 },
      { name: 'Rural', code: 'R', factor: 2 },
    ];
    this.types = [
      { name: 'Erf', code: 'E', factor: 1 },
      { name: 'Farm', code: 'F', factor: 2 },
      { name: 'Agricultural Holding', code: 'A', factor: 3 },
      { name: 'Sectional Title', code: 'S', factor: 4 }
    ];
    this.deedsOffices = [
      { name: 'Head Office', code: 'H', factor: 1 },
      { name: 'Bloemfontein', code: 'B', factor: 2 },
      { name: 'Cape Town', code: 'CT', factor: 3 },
      { name: 'Johannesburg', code: 'J', factor: 4 },
      { name: 'Kimberly', code: 'K', factor: 5 },
      { name: 'King Williams Town', code: 'K', factor: 6 },
      { name: 'Limpopo', code: 'B', factor: 2 },
      { name: 'Mpumalanga', code: 'CT', factor: 3 },
      { name: 'Pietermaritzburg', code: 'J', factor: 4 },
      { name: 'Pretoria', code: 'K', factor: 5 },
      { name: 'Umtata', code: 'K', factor: 6 },
      { name: 'Vryburg', code: 'K', factor: 6 },
    ];
    this.provinces = [
      { name: 'Eastern Cape', code: 'EC', factor: 1 },
      { name: 'Free State', code: 'FS', factor: 2 },
      { name: 'Gauteng', code: 'G', factor: 3 },
      { name: 'Kwazulu Natal', code: 'KZN', factor: 4 },
      { name: 'Limpopo', code: 'L', factor: 5 },
      { name: 'Mpumalanga', code: 'MP', factor: 6 },
      { name: 'Northern Cape', code: 'NC', factor: 7 },
      { name: 'North West', code: 'NW', factor: 8 },
      { name: 'Western Cape', code: 'WC', factor: 9 }
    ];

    this.districtMunicipalities = [
      { name: 'Ehlanzeni District Municipality', code: 'E', factor: 1 },
      { name: 'Gert Sibande District Municipality', code: 'G', factor: 2 },
      { name: 'Nkangala District Municipality', code: 'N', factor: 3 }
    ];

    this.landRemainders = [
      { name: 'Yes ', code: 'Y', factor: 1 },
      { name: 'No', code: 'N', factor: 2 },
    ];

    this.vats = [
      { name: 'Incl', code: 'I', factor: 1 },
      { name: 'Excl', code: 'E', factor: 2 },
    ];

    this.functionalPerformanceRatings = [
      { name: '1 - The asset standards exceeds the level expected for functional and operational requirements', code: '1', factor: 1 },
      { name: '2 - Functional Performance meets the standards expected for functional and operational requirements', code: '2', factor: 2 },
      { name: '3 -Functional Performance does not meet the standard expected for functional and operational requirements', code: '3', factor: 3 }
    ];

    this.howAcquired = [
      { name: 'Purchased', code: 'P', factor: 1 },
      { name: 'Expropriated', code: 'E', factor: 2 },
      { name: 'Donation', code: 'D', factor: 3 },
      { name: 'Exchanged', code: 'EX', factor: 4 },
      { name: 'Revision', code: 'R', factor: 5 },
      { name: 'Repossession', code: 'RP', factor: 6 },
      { name: 'Prescription', code: 'PS', factor: 7 },
      { name: 'Lease Contract', code: 'LC', factor: 8 },
      { name: 'Inherited', code: 'I', factor: 9 },
      { name: 'Other', code: 'O', factor: 10 }
    ];
    this.regions = [
      { name: 'Ehlanzeni ', code: 'U', factor: 1 },
      { name: 'Gert Sibande', code: 'R', factor: 2 },
      { name: 'Nkangala', code: 'U', factor: 3 }
    ];

    this.conditionRatings = [
      { name: 'C1 (Very Poor)', code: 'C1', factor: 1 },
      { name: 'C2 (Poor)', code: 'C2', factor: 2 },
      { name: 'C3 (Fair)', code: 'C3', factor: 3 },
      { name: 'C4 (Good)', code: 'C4', factor: 4 },
      { name: 'C5 (Excellent)', code: 'C5', factor: 5 },
    ];

    this.incomeLeaseStatuses = [
      { name: 'Yes', code: 'Y', factor: 1 },
      { name: 'No', code: 'N', factor: 2 }
    ];

    this.natureOfLeases = [
      { name: 'Residential', code: 'R', factor: 1 },
      { name: 'Business', code: 'B', factor: 2 }
    ];
  }

  showToast(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary: summary, detail: detail });
  }

  assginfacility(){
    let deedsOffice = 
    this.landForm = this.formBuilder.group({
      deedsOffice: ['', Validators.required],
      class: ['', Validators.required],
      type: ['', [Validators.required]],
      province: ['', [Validators.required]],
      town: ['', [Validators.required]],
      suburb: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      districtMunicipality: ['', [Validators.required]],
      region: ['', [Validators.required]],
      localAuthority: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      registrationDivision: ['', [Validators.required]],
      townshipName: ['', [Validators.required]],
      landParcel: ['', [Validators.required]],
      landPortion: ['', [Validators.required]],
      oldDescription: ['', [Validators.required]],
      landRemainder: ['', [Validators.required]],
      farmName: ['', [Validators.required]],
      SGDiagramNumber: ['', [Validators.required]],
      extent: ['', [Validators.required]],
      LPICode: ['', [Validators.required]],
      acquired: ['', [Validators.required]],
      acquiredOther: ['', [Validators.required]],
      titleDeedNumber: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      registeredOwner: ['', [Validators.required]],
      vestingDate: ['', [Validators.required]],
      conditionsOfTitle: ['', [Validators.required]],
      ownershipCategory: ['', [Validators.required]],
      stateOwnedPercentage: ['', [Validators.required]],
      landUse: ['', [Validators.required]],
      zoning: ['', [Validators.required]],
      userDepartment: ['', [Validators.required]],
      facilityName: ['', [Validators.required]],
      incomeLeaseStatus: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      leaseNumber: ['', [Validators.required]],
      otherCharges: ['', [Validators.required]],
      rentalAmount: ['', [Validators.required]],
      terminationDate: ['', [Validators.required]],
      startingDate: ['', [Validators.required]],
      occupationDate: ['', [Validators.required]],
      escalation: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      capacityofContactPerson: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      leaseStatusTown: ['', [Validators.required]],
      POBox: ['', [Validators.required]],
      IDNumberCompanyRegistrationNumber: ['', [Validators.required]],
      natureOfLease: ['', [Validators.required]],
      magisterialDistrict: ['', [Validators.required]]
    });
    this.improvementForm = this.formBuilder.group({
      buildingName: ['', Validators.required],
      typeOfImprovement: ['', Validators.required],
      sizeofImprovement: ['', [Validators.required]],
      potentialUse: ['', [Validators.required]],
      town: ['', [Validators.required]],
      suburb: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      siteCoverag: ['', [Validators.required]],
      functionalPerformanceRating: ['', [Validators.required]],
      extentofBuilding: ['', [Validators.required]],
      conditionRating: ['', [Validators.required]],
      usableArea: ['', [Validators.required]],
    });
    this.financialForm = this.formBuilder.group({
      landUseClass: ['', Validators.required],
      natureofAsset: ['', Validators.required],
      additionCash: ['', [Validators.required]],
      dateofMunicipalValuation: ['', [Validators.required]],
      dateofNonMunicipalValuation: ['', [Validators.required]],
    });
  }

}
