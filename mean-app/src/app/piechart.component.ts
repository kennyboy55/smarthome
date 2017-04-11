import { Component, OnInit, OnChanges, ViewChild, ElementRef,Input } from '@angular/core';

import { LineData } from './line-data';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { LabelData } from "./label-data";

@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html'
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input()data:LineData;
  @Input()label:LabelData;

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  // lineChart
  public pieChartData:number[] = [0,0];
  public pieChartLabels:string[] = ['-1', '-2'];
  public pieChartType:string = 'pie';

  constructor() {}

  ngOnInit(): void {

    this.pieChartLabels = this.label.data.slice();
    this.pieChartData = this.data.data.slice();
  }

  ngOnChanges(): void {
    if(this.chart.chart != undefined){
      this.chart.chart.update();
    }
  }
}
