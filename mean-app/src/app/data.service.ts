import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';

import { LineData } from './line-data';

@Injectable()
export class DataService {
  private baseUrl: string = 'http://localhost:3000/webapi/data';

  constructor(private http : Http){}

  get(): Observable<LineData> {

    let lineChartData$ =
      //<LineData>( {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'} );
      this.http
        .get((`${this.baseUrl}`)
          , {headers: this.getHeaders()})
        .map(mapData);

    return Observable.create(observer => {
             observer.next(lineChartData$);
             observer.complete();
   });

  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapData(response:Response): LineData {
  return response.json().data.map(toBeer)
}

function toBeer(r:any): LineData{
  let lineData = <LineData>({
    data: r.TOE1,
    label: r.time,
    description: (r.description || "No description")
  });
  console.log('Parsed Data:', lineData);
  return lineData;
}

