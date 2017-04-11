import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from './data.service';
import {LineChartComponent} from "./chart.component";
import {LineData} from "./line-data";
import {LabelData} from "./label-data";

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  public id:string = 'Loading';
  public name:string = "Loading";

  public label:LabelData;
  
  public data1:LineData;
  public data2:LineData;
  public data3:LineData;
  public data4:LineData;

  public hov:number = 0;
  public htv:number = 0;
  public ht:string = "loading";  
  public money:number = 0;

  public loaded:boolean = false;

  public subscription:Subscription;

  public lineChartOptions:any = {
    responsive: true,
    title: {
      display: true,
      position: 'left',
      text: 'Watt'
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private dataService: DataService,
             private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.refreshData(this.id);

    this.subscription = IntervalObservable.create(7500).subscribe(n => this.refreshData(this.id));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshData(id:string)
  {
      console.log("Refreshing data for ", this.id);

      this.dataService
      .get(id)
      .subscribe(res => {

        this.label = res.labels;
        this.data1 = res.HOV;
        this.data2 = res.HTV;

        this.data3 = res.TOE2;
        this.data4 = res.TTE2;

        this.loaded = true;

        this.chart.chart.update();

      });

      this.dataService
      .usage(id)
      .subscribe(res => {

        this.hov = res.HOV;
        this.htv = res.HTV;
        this.ht = res.HTN;

        this.money = ((res.TOE1 - res.TTE1) * res.tarief1) + ((res.TOE2 - res.TTE2) * res.tarief2);

      });

      this.dataService
      .name(id)
      .subscribe(res => {

        this.name = res;

      });
  }

}
