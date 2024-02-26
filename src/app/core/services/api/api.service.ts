import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Loader } from 'src/app/shared/enums/loader';
import { filter, finalize } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(public http: HttpClient, private loaderService: LoaderService) {}

  /**
   * sends GET request
   * @param endpoint: string
   * @param options: any
   */
  get(endpoint: string, options?: any, loader?: Loader): Observable<any> {
    if (loader) {
      this.loaderService.start(loader);
    }

    return this.http.get(endpoint, options ? options : {}).pipe(
      finalize( () => {
        if(loader) {
          this.loaderService.stop(loader)
        }
      }) 
    )
  }

  /**
   * sends POST request
   * @param endpoint: string
   * @param options: any
   */
  post(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.post(endpoint, body ? body : {}, options ? options : {});
  }

  /**
   * sends PUT request
   * @param endpoint: string
   * @param options: any
   */
  put(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.put(endpoint, body ? body : {}, options ? options : {});
  }

  /**
   * sends DELETE request
   * @param endpoint: string
   * @param options: any
   */
  delete(endpoint: string, options?: any): Observable<any> {
    return this.http.delete(endpoint, options ? options : {});
  }

  /**
   * sends PATCH request
   * @param endpoint: string
   * @param options: any
   */
  patch(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.patch(endpoint, body ? body : {}, options ? options : {});
  }
}
