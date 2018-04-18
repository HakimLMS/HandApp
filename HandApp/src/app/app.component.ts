import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PathLocationStrategy,
    {provide: LocationStrategy, useClass: HashLocationStrategy},]
})
export class AppComponent  {
  constructor(router: Router, pathLocationStrategy: PathLocationStrategy) {
    const basePath = pathLocationStrategy.getBaseHref();
    const absolutePathWithParams = pathLocationStrategy.path();

    if (basePath !== absolutePathWithParams) {
      router.navigateByUrl(absolutePathWithParams);
    }
  }
}
