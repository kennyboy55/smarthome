import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http, Response, Headers } from '@angular/http';

import { LineData } from './line-data';
import { GraphData } from './graph-data';
import { LabelData } from './label-data';

import { Device } from './device';
import { Usage } from './usage';

@Injectable()
export class DataService {
  private getUrl: string = '/webapi/data';
  private usageUrl: string = '/webapi/usage';
  private nameUrl: string = '/webapi/name';
  private deviceUrl: string = '/webapi/device';

  constructor(private http : Http){}

  get(id:string): Observable<GraphData> {
    let lineChartData$ =
      this.http
        .get((`${this.getUrl}/${id}`)
          , {headers: this.getHeaders()})
        .map(mapData);

    return lineChartData$;
  }

  usage(id:string): Observable<Usage> {
    let usageData$ =
      this.http
        .get((`${this.usageUrl}/${id}`)
          , {headers: this.getHeaders()})
        .map(mapUsage);

    return usageData$;
  }

  name(id:string): Observable<string> {
    let nameData$ =
      this.http
        .get((`${this.nameUrl}/${id}`)
          , {headers: this.getHeaders()})
        .map(mapName);

    return nameData$;
  }


  devices(): Observable<Device[]> {
    let devices$ =
      this.http
        .get((`${this.deviceUrl}`)
          , {headers: this.getHeaders()})
        .map(mapDevice);

    return devices$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapData(response:Response): GraphData {
  let TOE1S = response.json().map(toe1ToData);
  let TOE2S = response.json().map(toe2ToData);
  let HOV = response.json().map(hovToData);
  let HT = response.json().map(htToData);
  let times = response.json().map(timeToData);

  let Toe1Line:LineData = <LineData>({data: TOE1S, label: "Totaal Energieverbruik tarief 1"});
  let Toe2Line:LineData = <LineData>({data: TOE2S, label: "Totaal Energieverbruik tarief 2"});
  let HovLine:LineData = <LineData>({data: HOV, label: "Huidig Energieverbruik"});
  let HtLine:LineData = <LineData>({data: HT, label: "Huidig Tarief"});
  let label:LabelData = <LabelData>({data: times});
  let graph:GraphData = <GraphData>({TOE1:Toe1Line,TOE2:Toe2Line,HOV:HovLine,HT:HtLine,labels:label});
  return graph;
}

function toe1ToData(r:any){
  let TOE1 = r.TOE1;
  return TOE1;
}

function toe2ToData(r:any){
  let TOE2 = r.TOE2;
  return TOE2;
}

function hovToData(r:any){
  let HOV = r.HOV;
  return HOV;
}

function htToData(r:any){
  let HT = r.HT;
  return HT;
}

function timeToData(r:any){
  let times = r.time.substring(11,19);
  return times;
}


function mapUsage(response:Response): Usage {
  let usage = response.json().map(toUsage);
  return usage;
}

function toUsage(r:any): Usage
{
    let usage = <Usage>({
      hov: r.HOV,
      htv: r.HTV,
      ht: r.HT
    });

    return usage;
}

function mapName(response:Response): string {
  let name = response.json().map(toName);
  return name;
}

function toName(r:any): string
{
    return r.name;
}


function mapDevice(response:Response): Device[] {
  let devices = response.json().map(toDevice);
  return devices;
}


function toDevice(r:any){
  let device = <Device>({
      sn: r.SN,
      name: r.name
  });

  return device;
}
