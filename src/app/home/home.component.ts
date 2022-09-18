import { Component, OnDestroy, OnInit } from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  private subsCount: Subscription;
  constructor() { }

  //here we reate a observable where we generate a number for every second 
  ngOnInit() {
    // this.subsCount = interval(1000).subscribe(count => { // here interval method acts as my observable which triggers a number for every second
    //   console.log(count);
    // })

    // here we create an actual custom observable which will get values for every second.
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count greater than 3!"));
        }
        count++;
      },1000);
    });



    this.subsCount = customIntervalObservable.pipe(filter( data => {
      return data > 0;
    }),map((data: number) => {
      return 'Round: '+(data + 1);
    })).subscribe(data =>{
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () =>{
      console.log('Completed');
    })
  }

  ngOnDestroy(): void { // here we unsubscribe to remove unwanted data
      this.subsCount.unsubscribe();
  }

}
