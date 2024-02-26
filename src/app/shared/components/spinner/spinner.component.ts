import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { Loader } from '../../enums/loader';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() local = false;
  @Input() withSidebar = true;
  //change color of spinner( create a css class first)
  @Input() color = "default";

  //change position of local loader
  position: {[key:string]: string} = {
    margin: "auto",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
  };
  @Input() inputPosition!: {[key:string]: string};



  //turn overlay off/on depending to prevent user from doing other actions or not
  @Input() overlay = false;
  //loader you want to subscribe to
  @Input() loader: Loader | null  = null;
  @Input() multipleLoaders: Loader[] | null = null;
  @Output() loaderStateEmitter = new EventEmitter<boolean>();
  public show = false;
  private subscription = new Subscription();
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    if (this.loader) {
      this.subscription.add(this.loaderService
        .getLoader(this.loader)
        ?.subscribe((show) => {
          this.show = show
          this.loaderStateEmitter.emit(this.show);
        }))
    }
    else if(this.multipleLoaders) {
      const subscribers: Subject<boolean>[] | null = this.multipleLoaders.reduce(
        (subscribers: any[], loader: Loader) => 
        subscribers = [...subscribers, this.loaderService.getLoader(loader)]
        , []
      )
      this.initMultiLoaderSub(subscribers);
    }
  }

  //get as input multiple loaders and combine them
  private initMultiLoaderSub(subscribers: Subject<boolean>[]) {
    combineLatest([...subscribers]).subscribe(
      (loaderValues) => {
        console.log(loaderValues);
          this.show = loaderValues.reduce((prev,curr) => prev||curr);
          this.loaderStateEmitter.emit(this.show);
      }
    )
  }

  ngOnChanges(): void {
    if(this.inputPosition) {
      this.position = {...this.position, ...this.inputPosition};
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
