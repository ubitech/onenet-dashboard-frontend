import { Component, OnInit, Input, ElementRef, ViewChild, ViewRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RESPONSE_CODES, RESPONSE_CODES_CLASS_MAPPING } from "../../../../shared/constants/responseCodes";
import { REQUEST_METHODS } from "../../../../shared/constants/requestMethods";
import { COUNTRY_MAPPING, COUNTRY_MAPPING_INVERSE } from "../../../../shared/constants/countryMapping";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ByteUnits} from 'src/app/shared/enums/byteUnits';
import { CONNECTOR_LIST } from 'src/app/core/constants/connector-list';
import { NetworkMonitoringAnalyticsService } from "../../services/network-monitoring-analytics.service";
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AdvancedFilteringProfile } from 'src/app/core/models/advancedFilteringProfile';
import { AdvancedFilteringResult } from 'src/app/core/models/advancedFilteringResult';
import { AdvancedFilteringFilter } from 'src/app/core/models/advancedFilteringFilter';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-advanced-filtering',
  templateUrl: './advanced-filtering.component.html',
  styleUrls: ['./advanced-filtering.component.scss']
})
export class AdvancedFilteringComponent implements OnInit {

  private _subscription = new Subscription();

  resultsLoading = false;

  // Pagination related variables
  public pageIndex = 0;
  pageSize: number = 10;
  paginatorLowValue: number = 0;
  paginatorHighValue: number = this.pageSize;
  pageSizeOptions: number[] = [this.pageSize];

  public connectorList: string[] = [];
  public selectedConnector: string = CONNECTOR_LIST.ALL_CONNECTORS;

  NUMBER_FORM_CONTROL = [
    Validators.min(0),
    Validators.pattern(/^[0-9]+$/)
  ];

  public profileList: AdvancedFilteringProfile[] = [];
  public selectedProfileName: string;
  public dialogProfileName: string;
  // Note: Here we do not set MatDialogRef as a type to avoid giving it
  // component type as input, since we do define the dialog as a ng-template
  private dialogRef: any;
  @ViewChild('saveProfileDialog') saveProfileDialog: TemplateRef<any>;
  profileNameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
    Validators.pattern(/^[a-zA-Z0-9\s]+$/)
  ])

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public inputTimeUnits: string;
  public allTimeUnits: string[] = ["minutes", "hours", "days", "weeks", "months"]
  public selectedTimeUnits: string = this.allTimeUnits[2];
  timeUnitsFormControl = new FormControl();
  minutesPerTimeUnitMapping = {
    minutes: 1,
    hours: 60,
    days: 60 * 24,
    weeks: 60 * 24 * 7,
    months: 60 * 24 * 30,
  }

  clientIPs: string[] = [];
  clientIPsFormControl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  requestMethodCtrl = new FormControl();
  filteredRequestMethods: Observable<string[]>;
  requestMethods: string[] = [];
  allRequestMethods: string[] = REQUEST_METHODS;
  @ViewChild('requestMethodInput') requestMethodInput: ElementRef<HTMLInputElement>;
  @ViewChild('requestMethodAutocomplete') requestMethodAutocomplete: MatAutocomplete;

  responseCodeCtrl = new FormControl();
  filteredResponseCodes: Observable<string[]>;
  responseCodes: string[] = [];
  allResponseCodes: string[] = RESPONSE_CODES;
  @ViewChild('responseCodeInput') responseCodeInput: ElementRef<HTMLInputElement>;
  @ViewChild('responseCodeAutocomplete') responseCodeAutocomplete: MatAutocomplete;

  countryCtrl = new FormControl();
  filteredCountries: Observable<string[]>;
  countries: string[] = [];
  allCountries: string[] = Object.values(COUNTRY_MAPPING);
  @ViewChild('countryInput') countryInput: ElementRef<HTMLInputElement>;
  @ViewChild('countryAutocomplete') countryAutocomplete: MatAutocomplete;
  countryMapping: any = COUNTRY_MAPPING;
  countryMappingInverse: any = COUNTRY_MAPPING_INVERSE;

  dataSentFormGroup: FormGroup;
  dataSentMin = null;
  dataSentMax = null;
  dataSentMinFormControl: FormControl;
  dataSentMaxFormControl: FormControl;
  dataSentMultiplierMapping = {};

  public dataSentUnitsList: string[] = Object.values(ByteUnits);
  public selectedDataSentUnits: string = this.dataSentUnitsList[1];

  results: AdvancedFilteringResult[] = [];
  responseCodesClassMapping: any = RESPONSE_CODES_CLASS_MAPPING;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private clipboard: Clipboard,
    private _networkMonitoringAnalytics: NetworkMonitoringAnalyticsService,
    private alertService: AlertService,
    private _cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.dataSentMultiplierMapping[ByteUnits.BYTES] = 1;
    this.dataSentMultiplierMapping[ByteUnits.KILOBYTES] = 1000;
    this.dataSentMultiplierMapping[ByteUnits.MEGABYTES] = 1000000;

    this.profileList = JSON.parse(localStorage.getItem("profiles") || "[]")

    if (!(this.profileList.length > 0 && this.profileList[0].profileName === "Default")) {
      this.profileList = [
        {
          profileName: "Default",
          connector: CONNECTOR_LIST.ALL_CONNECTORS,
          dateFrom: null,
          dateTo: null,
          inputTimeUnits: '',
          selectedTimeUnits: this.allTimeUnits[2], // days
          clientIPs: [],
          requestMethods: [],
          responseCodes: [],
          dataSentMin: null,
          dataSentMax: null,
          selectedDataSentUnits: this.dataSentUnitsList[1],
          countries: []
        },
        ...this.profileList
      ]
    }
    this.selectedProfileName = this.profileList[0].profileName;

    this._networkMonitoringAnalytics.$selectedConnector.next(this.formatConnectorPath(this.selectedConnector));

    this._networkMonitoringAnalytics.getConnectorList();
    this._networkMonitoringAnalytics.getConnectorListObs.subscribe(
      {
        next: (data: any) => {
          if (data.length === 0) return;

          this.connectorList = [CONNECTOR_LIST.ALL_CONNECTORS].concat(data);

          this._cd.detectChanges();
        },
      }
    );

    // Autocomplete for request methods, response codes and countries
    this.filteredRequestMethods = this.requestMethodCtrl.valueChanges.pipe(
      startWith(null),
      map((requestMethod: string | null) => requestMethod ? this.allRequestMethods.filter((requestMethodOfArray: string) => requestMethodOfArray.toLowerCase().indexOf(requestMethod.toLowerCase()) === 0) : this.allRequestMethods.slice()));

    this.filteredResponseCodes = this.responseCodeCtrl.valueChanges.pipe(
      startWith(null),
      map((responseCode: string | null) => responseCode ? this.allResponseCodes.filter(rc => rc.indexOf(responseCode) === 0) : this.allResponseCodes.slice()));

    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(null),
      map((country: string | null) => country ? this.allCountries.filter((countryOfArray: string) => countryOfArray.toLowerCase().indexOf(country.toLowerCase()) === 0) : this.allCountries.slice()));
  }

  ngOnInit(): void {
    this.dataSentMaxFormControl = new FormControl('', this.NUMBER_FORM_CONTROL);
    this.dataSentMinFormControl = new FormControl('', this.NUMBER_FORM_CONTROL);
    this.timeUnitsFormControl = new FormControl('', this.NUMBER_FORM_CONTROL);

    this._subscription.add(
      this._networkMonitoringAnalytics.getAdvancedFilteringResultsObs.subscribe(
        {
          next: (data: any) => {
            this.pageIndex = 0
            this.paginatorLowValue = 0;
            this.paginatorHighValue = this.pageSize;
            this.results = data
            if (data.length == 0) {
              this.openSnackBar('No results found', 'OK');
            }
            this.resultsLoading = false;
          },
        }
      )
    );


    // Added to all pages
    this.alertService.getLatestAlerts();

    this._subscription.add(this.alertService.newLatestAlertsSubscription());

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.alertService.eventSource.close();
  }

  formatConnectorPath(connector: string) {
    return (connector == CONNECTOR_LIST.ALL_CONNECTORS) ? "" : connector;
  }

  onConnectorChange(newConnector: string) {
    this.selectedConnector = newConnector;
  }

  onProfileChange(newProfileName: string) {
    this.selectedProfileName = newProfileName;

    const foundProfiles = this.profileList.filter(prof => prof.profileName.indexOf(newProfileName) === 0);
    const p = foundProfiles[0];
    console.log('Loading selected profile', p)
    // Fill in all profile information in input fields
    this.selectedConnector = p.connector;
    this.dateRange.patchValue({
      start: p.dateFrom && new Date(p.dateFrom) || null,
      end: p.dateFrom && new Date(p.dateTo) || null
    })
    this.inputTimeUnits = p.inputTimeUnits;
    this.selectedTimeUnits = p.selectedTimeUnits;
    this.clientIPs = p.clientIPs;
    this.requestMethods = p.requestMethods;
    this.responseCodes = p.responseCodes;
    this.dataSentMin = p.dataSentMin;
    this.dataSentMax = p.dataSentMax;
    this.selectedDataSentUnits = p.selectedDataSentUnits;
    this.countries = p.countries;


  }

  openSaveProfileDialog() {
    this.dialogRef = this.dialog.open(this.saveProfileDialog);
  }

  onProfileNameConfirm(): void {
    if (this.profileNameFormControl.status === "VALID") {
      console.log('New profile name is', this.dialogProfileName)

      this.selectedProfileName = this.dialogProfileName;
      this.saveProfile(this.dialogProfileName);

      // Clear input so it's ready when the dialog opens again
      this.profileNameFormControl.patchValue('');

      this.dialogRef.close();
      this.openSnackBar('Profile saved', 'OK');
    }
  }

  saveProfile(name: string) {
    let dateRangeValue = this.dateRange.value
    let profile: AdvancedFilteringProfile = {
      profileName: name,
      connector: this.selectedConnector || "",
      dateFrom: dateRangeValue.start && dateRangeValue.start.toISOString() || null,
      dateTo: dateRangeValue.end && dateRangeValue.end.toISOString() || null,
      inputTimeUnits: this.inputTimeUnits || null,
      selectedTimeUnits: this.selectedTimeUnits,
      clientIPs: this.clientIPs || [],
      requestMethods: this.requestMethods || [],
      responseCodes: this.responseCodes || [],
      dataSentMin: this.dataSentMin,
      dataSentMax: this.dataSentMax,
      selectedDataSentUnits: this.selectedDataSentUnits,
      countries: this.countries
    }

    // Add new profile to list of profiles and save to local storage
    this.profileList = [...this.profileList, profile]
    localStorage.setItem("profiles", JSON.stringify(this.profileList));

    console.log('Saved profile to local storage', profile)
  }

  deleteSelectedProfile() {
    console.log('Deleting profile with name', this.selectedProfileName)
    const profileIndex = this.profileList.findIndex(prof => prof.profileName.indexOf(this.selectedProfileName) === 0);
    if (profileIndex == 0) {
      this.openSnackBar('Cannot delete Default profile', 'OK');
      return
    }
    this.profileList.splice(profileIndex, 1)
    this.selectedProfileName = this.profileList[0].profileName
    localStorage.setItem("profiles", JSON.stringify(this.profileList));
  }


  addClientIP(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.clientIPs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeClientIP(clientIP: string): void {
      const index = this.clientIPs.indexOf(clientIP);

      if (index >= 0) {
          this.clientIPs.splice(index, 1);
      }
  }

  addRequestMethod(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const trimmedValue = (value || '').trim()
    // Check if its in available request methods (case insensitive)
    const filteredRequestMethods = this.allRequestMethods.filter(verb => verb.toLowerCase().indexOf(trimmedValue) === 0);
    if (filteredRequestMethods.length > 0) {
        this.requestMethods.push(filteredRequestMethods[0]);
    }

    if (input) {
      input.value = '';
    }

    this.requestMethodCtrl.setValue(null);
  }

  onRequestMethodSelection(event: MatAutocompleteSelectedEvent): void {
    this.requestMethods.push(event.option.viewValue);
    this.requestMethodInput.nativeElement.value = '';
    this.requestMethodCtrl.setValue(null);
  }

  removeRequestMethod(requestMethod: string): void {
    const index = this.requestMethods.indexOf(requestMethod);

    if (index >= 0) {
      this.requestMethods.splice(index, 1);
    }
  }

  addResponseCode(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add response code
    let parsedValue = parseInt(value || '')
    if (parsedValue && parsedValue > 99 && parsedValue < 600) {
      this.responseCodes.push(parsedValue.toString());
    }

    if (input) {
      input.value = '';
    }

    this.responseCodeCtrl.setValue(null);
  }

  removeResponseCode(responseCode: string): void {
    const index = this.responseCodes.indexOf(responseCode);

    if (index >= 0) {
      this.responseCodes.splice(index, 1);
    }
  }

  onResponseCodeSelection(event: MatAutocompleteSelectedEvent): void {
    this.responseCodes.push(event.option.viewValue);
    this.responseCodeInput.nativeElement.value = '';
    this.responseCodeCtrl.setValue(null);
  }

  addCountry(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      const trimmedValue = (value || '').trim()
      // Check if its in available countries (case insensitive)
      const filteredCountries = this.allCountries.filter(country => country.toLowerCase().indexOf(trimmedValue) === 0);
      if (filteredCountries.length > 0) {
          this.countries.push(filteredCountries[0]);
      }

      if (input) {
          input.value = '';
      }

      this.countryCtrl.setValue(null);
  }

  removeCountry(country: string): void {
      const index = this.countries.indexOf(country);

      if (index >= 0) {
          this.countries.splice(index, 1);
      }
  }

  onCountrySelection(event: MatAutocompleteSelectedEvent): void {
      this.countries.push(event.option.viewValue);
      this.countryInput.nativeElement.value = '';
      this.countryCtrl.setValue(null);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  searchWithSelectedProfile() {
    let dateRangeValue = this.dateRange.value
    let dateFrom: string;
    let dateTo: string;
    this.resultsLoading = true;
    this.results = []
    // If we have 'X days ago' ignore date range from calendar
    if (this.inputTimeUnits) {
      let startDate = new Date();
      startDate.setMinutes(startDate.getMinutes() - parseInt(this.inputTimeUnits) * this.minutesPerTimeUnitMapping[this.selectedTimeUnits])
      dateFrom = startDate.toISOString()
      dateTo = null;
    }
    // Else get date range from calendar
    else {
      dateFrom = dateRangeValue.start && dateRangeValue.start.toISOString() || null;
      dateTo = dateRangeValue.end && dateRangeValue.end.toISOString() || null;
    }

    console.log('dateFrom =', dateFrom)
    console.log('dateTo =', dateTo)

    let filter: AdvancedFilteringFilter = {
        connector: this.selectedConnector == CONNECTOR_LIST.ALL_CONNECTORS ? null : this.selectedConnector,
        dateFrom: dateFrom,
        dateTo: dateTo,
        bytesSentMin: (this.dataSentMin == null ? null : (this.dataSentMin * this.dataSentMultiplierMapping[this.selectedDataSentUnits]).toString()),
        bytesSentMax: (this.dataSentMax == null ? null : (this.dataSentMax * this.dataSentMultiplierMapping[this.selectedDataSentUnits]).toString()),
        clientIPs: this.clientIPs,
        requestMethods: this.requestMethods,
        responseCodes: this.responseCodes,
        countries: this.countries.map(country => COUNTRY_MAPPING_INVERSE[country])
    }

    // console.log('filter', filter)
    this._networkMonitoringAnalytics.getAdvancedFilteringResults(filter);
  }

  copyToClipboard = (str: string) => {
    this.clipboard.copy(str);
    this.openSnackBar(`Copied ${str} to clipboard!`, 'OK');
  }

  downloadCsv() {
    // Construct CSV in the `content` variable
    const header = "Timestamp,Connector,Request Method,Request Path,Content Length,Response Code,Bytes Sent,Client IP,Operating System,Browser,Country Code,Country,City\n"
    let content = "data:text/csv;charset=utf-8,"+header
    for (const result of this.results) {
      content=content+`${result.timestamp},"${result.connector}",${result.requestMethod},${result.path},${result.contentLength},${result.responseCode},${result.bytesSent},${result.clientIP},${result.os},${result.browser},${result.countryCode},${this.countryMapping[result.countryCode.toUpperCase()]},${result.cityName}\n`
    }
    let encodedUri = encodeURI(content);

    // Use the hidden link method to trigger the download of the `content` variable as a CSV named "advanced-filtering.csv"
    let hiddenLink = document.createElement("a");
    hiddenLink.setAttribute("href", encodedUri);
    hiddenLink.setAttribute("download", "advanced-filtering.csv");
    document.body.appendChild(hiddenLink); // Required for FF
    hiddenLink.click();
  }

  // Adapted from: https://stackoverflow.com/a/51838549
  paginatorHandlePage(event){
    console.log(event);
    this.pageIndex = event.pageIndex;
    this.paginatorLowValue = this.pageIndex * this.pageSize;
    this.paginatorHighValue = this.pageIndex * this.pageSize + this.pageSize;
  }

}
