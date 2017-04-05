import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DataService } from './data.service';
import {LineChartComponent} from "./chart.component";

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {

  constructor(private dataService: DataService,
             private route: ActivatedRoute) {}

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];
    console.log("DetailComponentID= " +id);

 //   this.dataService
  //    .get(id)
  //    .subscribe(res => {


 //     });

  }

}
