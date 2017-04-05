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

  public data:LineData;
  public label:LabelData;

  public data2:LineData;

  constructor(private dataService: DataService,
             private route: ActivatedRoute) {}

  ngOnInit(): void {

     let id = this.route.snapshot.params['id'];
    console.log("DetailComponentID= " + id);

    this.dataService
      .get(id)
      .subscribe(res => {

        this.label = res.labels;
        this.data = res.HOV;
        this.data2 = res.TOE1;

      });

  }

}
