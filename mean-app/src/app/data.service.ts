import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http, Response, Headers } from '@angular/http';

import { LineData } from './line-data';

@Injectable()
export class DataService {
  private baseUrl: string = 'http://localhost:3000/webapi/data';

  constructor(private http : Http){}

  get(): Observable<LineData> {
    console.log('Getting data');
    let lineChartData$ =
      //<LineData>( {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'} );
      this.http
        .get((`${this.baseUrl}`)
          , {headers: this.getHeaders()})
        .map(mapData);

    console.log(lineChartData$);

    return lineChartData$;

  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapData(response:Response): LineData {
  console.log('Mapping data', LineData);
  let nums = response.json().map(toData);

  console.log(nums);

  let line:LineData = <LineData>({data: nums, label: "Series A"});
  console.log(line);
  return line;
}

function toData(r:any){
  let num = r.TOE1;
  console.log('Parsed Data:', num);
  return num;
}

