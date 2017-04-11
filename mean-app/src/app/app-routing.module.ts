import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { DeviceComponent } from './device.component';
import { DetailComponent } from './detail.component';
import { PickerComponent } from './picker.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'picker', component: PickerComponent},
  { path: 'detail/:id', component: DetailComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
