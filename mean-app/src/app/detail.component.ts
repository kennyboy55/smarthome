import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

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

  public id:string = 'Loading';
  public name:string = "Loading";

  public label:LabelData;
  
  public data1:LineData;
  public data2:LineData;
  public data3:LineData;
  public data4:LineData;
  public data5:LineData;
  public data6:LineData;

  public datapie1:LineData;
  public datapie2:LineData;
  public datapie3:LineData;

  public labelpie1:LabelData;
  public labelpie2:LabelData;
  public labelpie3:LabelData;

  public hov:number = 0;
  public htv:number = 0;
  public ht:string = "loading";  
  public money:number = 0;

  public loaded:boolean = false;
  public pieloaded:boolean = false;

  public subscription:Subscription;

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
      this.labelpie1 = <LabelData> ({data: ["Huidig opgenomen", "Huidig terug"]});
      this.labelpie2 = <LabelData> ({data: ["Totaal opgenomen 2", "Totaal terug 2"]});
      this.labelpie3 = <LabelData> ({data: ["Totaal opgenomen 1", "Totaal terug 1"]});

      this.dataService
      .get(id)
      .subscribe(res => {

        this.label = res.labels;
        this.data1 = res.HOV;
        this.data2 = res.HTV;

        this.data3 = res.TOE2;
        this.data4 = res.TTE2;

        this.data3 = res.TOE1;
        this.data4 = res.TTE1;

        this.loaded = true;

      });

      this.dataService
      .usage(id)
      .subscribe(res => {

        this.hov = res.HOV;
        this.htv = res.HTV;
        this.ht = res.HTN;

        this.money = ((res.TOE1 - res.TTE1) * res.tarief1) + ((res.TOE2 - res.TTE2) * res.tarief2);

        this.datapie1 = <LineData> ({data: [res.HOV, res.HTV], label: "Huidig verbruik"});
        this.datapie2 = <LineData> ({data: [res.TOE2, res.TTE2], label: "Totaal 2"});
        this.datapie3 = <LineData> ({data: [res.TOE1, res.TTE1], label: "Totaal 1"});

        this.pieloaded = true;

      });

      this.dataService
      .name(id)
      .subscribe(res => {

        this.name = res;

      });
  }

}
