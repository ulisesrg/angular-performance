import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare var gtag;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const navEndEvents$ = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      );
      navEndEvents$.subscribe((event: NavigationEnd) => {
        gtag('config', 'G-T68RBYNPXD', {
          page_path: event.urlAfterRedirects,
        });
      });
    }
  }
}
