import { Component, OnInit } from '@angular/core';
import { Device } from './device';

import { DataService } from './data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'device',
  templateUrl: './device.component.html'
})

export class DeviceComponent implements OnInit {

  public devices:Device[];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService
      .devices()
      .subscribe(res => {
        
      		this.devices = res;

      });

  }

  goToDetails(id:string): void {
    this.router.navigate(['/detail', id]);
  }

}
