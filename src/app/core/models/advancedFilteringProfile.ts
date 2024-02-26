export class AdvancedFilteringProfile {
  profileName: string;
  connector?: string;
  dateFrom?: string;
  dateTo?: string;
  inputTimeUnits?: string;
  selectedTimeUnits?: string;
  clientIPs?: string[];
  requestMethods?: string[];
  responseCodes?: string[];
  dataSentMin?: number;
  dataSentMax?: number;
  selectedDataSentUnits?: string;
  countries?: string[];
}

