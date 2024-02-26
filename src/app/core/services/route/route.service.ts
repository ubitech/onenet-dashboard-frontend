import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private _apiService: ApiService) { }

  market() {
    this._apiService.get(
      '/monitoring/market'
    ).subscribe();
  }
  
  dataSharingAnalytics() {
    this._apiService.get(
      '/monitoring/data'
    ).subscribe();
  }
  energyAnalytics() {
    this._apiService.get(
      '/monitoring/energy'
    ).subscribe();
  }
  networkMonitoringAnalytics() {
    this._apiService.get(
      '/monitoring/network'
    ).subscribe();
  }

}
