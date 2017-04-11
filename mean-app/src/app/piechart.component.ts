import { Component, OnInit, OnChanges, ViewChild, ElementRef,Input } from '@angular/core';
import { DataService } from './data.service';

import { LineData } from './line-data';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {LabelData} from "./label-data";

@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html'
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input()data:LineData;
  @Input()label:LabelData;

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  // lineChart
  public pieChartData:Array<any> = [0,0];
  public pieChartLabels:Array<any> = ['-1', '-2'];
  public pieChartType:string = 'pie';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.pieChartLabels = this.label.data.slice();

    const newDataSet = [];
    newDataSet.push(this.data.data);
    this.pieChartData = newDataSet;
  }

  ngOnChanges(): void {
    if(this.chart.chart != undefined){
      this.chart.chart.update();
    }

  }


}
