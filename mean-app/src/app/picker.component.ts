import { Component } from '@angular/core';

import { DataService } from './data.service';
import {LineChartComponent} from "./chart.component";
import {LineData} from "./line-data";
import {LabelData} from "./label-data";

@Component({
  selector: 'picker',
  templateUrl: './picker.component.html'
})

export class PickerComponent {

  public label:LabelData;
  public data:LineData;

  public loaded:boolean = false;

  constructor(private dataService: DataService) {}

  refreshData(id:string, group:string, date1:string, date2:string, property:string)
  {

      this.dataService
      .pick(id, group, date1, date2)
      .subscribe(res => {

        this.label = res.labels;
        this.data = res[property];

        this.loaded = true;

      });
  }

  onSubmit(form:any)
  {
     this.loaded = false;
     this.refreshData(form.meter, form.group, form.date1, form.date2, form.datatype);
  }
}
