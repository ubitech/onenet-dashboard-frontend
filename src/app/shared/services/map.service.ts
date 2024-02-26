import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {MapResponse} from '../interfaces/map/map-response';
import {Observable} from 'rxjs';
import {ApiService} from '../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  endpoint = 'https://nominatim.openstreetmap.org/';

  constructor(private api: ApiService) {
  }

  getLocationFromCoords(lat: number, lng: number): Observable<string> {
    return this.api
      .get(
        `${this.endpoint}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
      .pipe(
        map((res) => {
          return res.display_name;
          // const {
          //   state,
          //   postcode,
          //   country,
          //   house_number,
          //   road,
          //   suburb,
          //   town
          // } = res.address;
          // const mapAddress = new Address(
          //   state,
          //   postcode,
          //   country,
          //   house_number,
          //   road,
          //   suburb,
          //   town
          // );
          // return mapAddress.getAddressDescription();
        })
      );
  }

  getCoordsFromLocation(searchInput: string): Observable<MapResponse> {
    return this.api
      .get(
        `${this.endpoint}/search?format=jsonv2&q=${searchInput}`
      )
      .pipe(
        map((res) => {
          if (res && res.length > 0) {
            return res[0];
          }
        })
      );
  }
}
