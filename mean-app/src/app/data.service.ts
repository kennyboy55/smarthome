import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http, Response, Headers } from '@angular/http';

import { LineData } from './line-data';
import { GraphData } from './graph-data';
import { LabelData } from './label-data';

@Injectable()
export class DataService {
  private dashboardURL: string = '/webapi/dashboard';

  constructor(private http : Http){}

  dashboard(): Observable<GraphData> {
    let lineChartData$ =
      //<LineData>( {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'} );
      this.http
        .get((`${this.dashboardURL}`)
          , {headers: this.getHeaders()})
        .map(mapData);

    return lineChartData$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapData(response:Response): GraphData {
  let nums = response.json().map(toData);
  let times = response.json().map(timeToData)

  let line:LineData = <LineData>({data: nums, label: "Energieverbruik"});
  let label:LabelData = <LabelData>({data: times});
  let graph:GraphData = <GraphData>({lines:line,labels:label});
  return graph;
}

function toData(r:any){
  let num = r.TOE1;
  return num;
}

function timeToData(r:any){
  let times = r.time.substring(11,19);
  return times;
}

