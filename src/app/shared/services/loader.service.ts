import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Loader } from '../enums/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaders: {
    [name: string]: Subject<boolean>
  };

  constructor() { 
  }

  public addLoader(name: Loader) {
    const subject = new BehaviorSubject<boolean>(false)
    if(!this.loaders || !this.loaders.name) {
      this.loaders = {...this.loaders, [name]: subject};
    }
    this.addSubscription(subject);
  }

  public getLoader(name: Loader) {
    return this.loaders[name]? this.loaders[name]: null;
  }

  public start(name: Loader) {
    if(!this.loaders[name]) return;
    this.loaders[name].next(true);
  }

  public stop(name: Loader) {
    if(!this.loaders[name]) return;
    this.loaders[name].next(false);
  }

  private addSubscription(sub: BehaviorSubject<boolean> ) {
    sub.subscribe(val=> val);
  }



}
