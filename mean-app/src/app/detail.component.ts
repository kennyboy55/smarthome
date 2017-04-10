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

  public data:LineData;
  public label:LabelData;

  public data2:LineData;

  public hov:number = 0;
  public htv:number = 0;
  public ht:number = 0;  

  public loaded:boolean = false;

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

      this.dataService
      .get(id)
      .subscribe(res => {

        this.label = res.labels;
        this.data = res.TTE1;
        this.data2 = res.HTV;

        this.loaded = true;

      });

      this.dataService
      .usage(id)
      .subscribe(res => {

        this.hov = res.hov;
        this.htv = res.htv;
        this.ht = res.ht;

      });

      this.dataService
      .name(id)
      .subscribe(res => {

        this.name = res;

      });
  }

}
