import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { DataService } from './data.service';

import { LineData } from './line-data';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {LabelData} from "./label-data";

@Component({
  selector: 'line-chart',
  templateUrl: './chart.component.html'
})
export class LineChartComponent implements OnInit {

  @Input()data:LineData;
  @Input()label:LabelData;

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  // lineChart
  public lineChartData:Array<any> = [
    {data: [0,0,0,0,0,0,0], label: 'Totaal verbruik'}
  ];
  public lineChartLabels:Array<any> = ['-1', '-2', '-3', '-4', '-5', '-6', '-7'];
  public lineChartOptions:any = {
    responsive: true,
    title: {
      display: true,
      position: 'left',
      text: 'Watt'
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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

        this.lineChartLabels = this.label.data.slice();

        console.log("Updated labels array");
        console.log(this.lineChartLabels);

        const newDataSet = [];
        const newLine = {data: this.data.data, label: this.data.label};
        newDataSet.push(newLine);
        this.lineChartData = newDataSet;

        console.log("Updated lines array");
        console.log(this.lineChartData);

        this.chart.chart.update();

  }
}
