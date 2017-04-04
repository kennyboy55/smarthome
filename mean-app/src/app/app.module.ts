import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { LineChartComponent } from './chart.component';

import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
