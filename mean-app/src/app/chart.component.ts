import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

import { LineData } from './line-data';

@Component({
  selector: 'line-chart',
  templateUrl: './chart.component.html'
})
export class LineChartComponent implements OnInit {
  // lineChart
  public lineChartData:Array<any> = [
    {data: [1,0,0,0,0,0,1], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['', '', '', '', '', '', ''];
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

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService
      .get()
      .subscribe(res => {
        console.log(res);

        const newDataSet = [];
        const newLine = {data: res.lines.data, label: res.lines.label};
        newDataSet.push(newLine);
        this.lineChartData = newDataSet;

        const newDataSet2 = [];
        newDataSet2.push(res.labels.data.slice());
        this.lineChartLabels = newDataSet2;
      });

    console.log("Init");
  }
}