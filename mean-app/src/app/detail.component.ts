import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DataService } from './data.service';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {

  constructor(private dataService: DataService,
             private route: ActivatedRoute) {}

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];

    this.dataService
      .get(id)
      .subscribe(res => {
        

      });

  }

}
