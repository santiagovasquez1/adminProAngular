import { filter, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [
  ]
})
export class BreadCrumbsComponent implements OnInit, OnDestroy {

  public title: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getTitlePage().subscribe(result => {
      this.title = result.title;
      document.title = `AdminPro-${result.title}`;
    }, error => {
      console.log(error);
    });;
  }


  private getTitlePage() {
    return this.router.events
      .pipe(
        filter(result => result instanceof ActivationEnd),
        filter((result2: ActivationEnd) => {
          if (result2.snapshot.firstChild == null) {
            return true;
          }
        }),
        map((result3: ActivationEnd) => result3.snapshot.data)
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

}
