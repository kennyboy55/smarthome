import { Component, OnInit, OnChanges, ViewChild, ElementRef,Input } from '@angular/core';

import { LineData } from './line-data';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { LabelData } from "./label-data";

@Component({
  selector: 'doubleline-chart',
  templateUrl: './doublelinechart.component.html'
})
export class DoubleLineChartComponent implements OnInit, OnChanges {

  @Input()data:LineData;
  @Input()data2:LineData;
  @Input()label:LabelData;

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  // line2Chart
  public doublelineChartData:Array<any> = [
    {data: [0,0,0,0,0,0,0], label: 'Verbruik'},
    {data: [0,0,0,0,0,0,0], label: 'Verbruik2'}
];
  public doublelineChartLabels:Array<any> = ['-1', '-2', '-3', '-4', '-5', '-6', '-7'];
  public doublelineChartOptions:any = {
    responsive: true,
    title: {
      display: true,
      position: 'left',
      text: 'KiloWatt'
    }
  };
  public doublelineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,255,0.2)',
      borderColor: 'rgba(148,159,255,1)',
      pointBackgroundColor: 'rgba(148,159,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,255,0.8)'
    }
  ];
  public doublelineChartLegend:boolean = true;
  public doublelineChartType:string = 'line';

  constructor() {}

  ngOnInit(): void {

    this.doublelineChartLabels = this.label.data.slice();

    const newDataSet = [];
    const newLine =  {data: this.data.data, label: this.data.label};
    const newLine2 = {data: this.data2.data, label: this.data2.label};
    newDataSet.push(newLine);
    newDataSet.push(newLine2);
    this.doublelineChartData = newDataSet;
  }

  ngOnChanges(): void {
    if(this.chart.chart != undefined){
      this.chart.chart.update();
    }

  }
}
