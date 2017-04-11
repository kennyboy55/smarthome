import {Component, OnDestroy, OnInit} from '@angular/core';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from './data.service';
import {LineChartComponent} from "./chart.component";
import {LineData} from "./line-data";
import {LabelData} from "./label-data";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
  public data1:LineData;
  public data2:LineData;

  public mloaded:boolean = false;
  public kloaded:boolean = false;

  public subscription:Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.refreshData();

    this.subscription = IntervalObservable.create(7500).subscribe(n => this.refreshData());

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshData()
  {
    console.log("Refreshing data");

    this.dataService
      .usage("4530303035303031353538313833363134")
      .subscribe(res => {
        console.log("result ");
        console.log(res);
        this.data1 = <LineData> ({data: [res.HOV, res.HTV], label: "Verbruik Martijn"});
        console.log("data ");
        console.log(this.data1);
        this.mloaded = true;

      });

    this.dataService
      .usage("4530303235303030303636383733323136")
      .subscribe(res => {

        this.data2 = <LineData> ({data: [res.HOV, res.HTV], label: "Verbruik Kenneth"});
        this.kloaded = true;

      });

    this.dataService
      .get("4530303235303030303636383733323136")
      .subscribe(res => {

      });

  }
}
