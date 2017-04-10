import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DataService } from './data.service';
import {LineChartComponent} from "./chart.component";
import {LineData} from "./line-data";
import {LabelData} from "./label-data";

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {

  public name:string = "Loading";

  public data:LineData;
  public label:LabelData;

  public data2:LineData;

  public hov:number = 0;
  public htv:number = 0;
  public ht:number = 0;  

  public loaded:boolean = false;

  constructor(private dataService: DataService,
             private route: ActivatedRoute) {}

  ngOnInit(): void {

     let id = this.route.snapshot.params['id'];

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

        console.log("Usage:");
        console.log(res);

        this.hov = res.hov;
        this.htv = res.htv;
        this.ht = res.ht;

      });

      this.dataService
      .name(id)
      .subscribe(res => {

        console.log("Name:");
        console.log(res);

        this.name = res;

      });

  }

}
