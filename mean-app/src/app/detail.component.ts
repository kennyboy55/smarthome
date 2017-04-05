import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DataService } from './data.service';
import {LineChartComponent} from "./chart.component";

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {

  public id:string;

  constructor(private dataService: DataService,
             private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log("DetailComponentID= " + this.id);

 //   this.dataService
  //    .get(id)
  //    .subscribe(res => {


 //     });

  }

}
