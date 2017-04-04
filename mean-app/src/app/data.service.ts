import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { LineData } from './line-data';

@Injectable()
export class DataService {
  
  get(): Observable<LineData> {
    
    let lineChartData$:LineData =
      <LineData>( {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'} );

    return Observable.create(observer => {
             observer.next(lineChartData$);
             observer.complete();
   });

  }
}