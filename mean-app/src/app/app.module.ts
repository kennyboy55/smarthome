import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LineChartComponent } from './chart.component';
import { PieChartComponent } from './piechart.component';
import { DashboardComponent } from './dashboard.component';
import { DeviceComponent } from './device.component';
import { DetailComponent } from './detail.component';
import { PickerComponent } from './picker.component';

import { DataService } from './data.service';
import {DoubleLineChartComponent} from "./doublelinechart.component";

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    DoubleLineChartComponent,
    PieChartComponent,
    DashboardComponent,
    DeviceComponent,
    DetailComponent,
    PickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
