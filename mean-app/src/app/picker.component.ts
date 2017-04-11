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

  refreshData(id:string)
  {

      this.dataService
      .get(id)
      .subscribe(res => {

        this.label = res.labels;
        this.data = res.HOV;

        this.loaded = true;

      });
  }

  onSubmit(form:any)
  {
    console.log(form);
  }
}
