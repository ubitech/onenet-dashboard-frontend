import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkMonitoringAnalysis {

  constructor(private api: ApiService, private loaderService: LoaderService) {

  }

  //TODO: Just for testing, remove it when it's no longer needed
  clusteringDataViewer(): void {
    this.api
      .get(`/analytics/clustering/data_viewer`)
      .pipe(
        tap((data) => {
          console.log(data)
        })
      ).subscribe();
  }
}
