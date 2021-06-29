import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {


  public mySubscription: Subscription;
  constructor() {

    // let i = -1;

    // // //Pipe nos sirve para modificar el comportamiento del obserble
    // this.myObservable(i).pipe(
    //   retry(5)
    // ).subscribe(result => {
    //   console.log('Subs: ', result);
    // }, error => {
    //   console.warn("Error:", error)
    // }, () => {
    //   console.info('Obs terminado');
    // });

    this.mySubscription = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnInit(): void {
  }

  //Take nos sirve para definir cuantas vaces se repite nuestro observer
  //Map nos ayuda a transformar el valor que retorna el observador
  retornaIntervalo(): Observable<string> {
    const intervalo$ = interval(100)
      .pipe(
        take(20),
        filter(valor => {
          if (valor % 2 != 0) {
            return true
          } else {
            return false
          }
        }),
        map(valor => {
          return 'Hola mundo' + (valor + 1)
        })
      );

    return intervalo$
  }

  myObservable(contador: number): Observable<number> {
    const obs$ = new Observable<number>(observer => {

      const interval = setInterval(() => {

        contador++;
        observer.next(contador);

        if (contador == 100) {
          clearInterval(interval);
          observer.complete();
        }

        if (contador == 2) {
          contador = 0;
          observer.error("El valor llego a 2");
        }

      }, 100);

    });

    return obs$;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.mySubscription.unsubscribe();
  }

}
