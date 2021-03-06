import { Component, OnInit, OnChanges, ViewChild, ElementRef,Input } from '@angular/core';

import { LineData } from './line-data';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { LabelData } from "./label-data";

@Component({
  selector: 'line-chart',
  templateUrl: './chart.component.html'
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input()data:LineData;
  @Input()label:LabelData;

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  // lineChart
  public lineChartData:Array<any> = [
    {data: [0,0,0,0,0,0,0], label: 'Verbruik'}
  ];
  public lineChartLabels:Array<any> = ['-1', '-2', '-3', '-4', '-5', '-6', '-7'];
  public lineChartOptions:any = {
    responsive: true,
    title: {
      display: true,
      position: 'left',
      text: 'KiloWatt'
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

  constructor() {}

  ngOnInit(): void {

        this.lineChartLabels = this.label.data.slice();

        const newDataSet = [];
        const newLine = {data: this.data.data, label: this.data.label};
        newDataSet.push(newLine);
        this.lineChartData = newDataSet;
  }

  ngOnChanges(): void {
    if(this.chart.chart != undefined){
      this.chart.chart.update();
    }

  }
}
