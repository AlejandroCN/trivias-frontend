import { Component, Input, OnInit } from '@angular/core';

import { Record } from 'src/app/models/record.model';

@Component({
  selector: 'app-tabla-records',
  templateUrl: './tabla-records.component.html',
  styles: [],
})
export class TablaRecordsComponent implements OnInit {
  @Input() public records: Record[];

  constructor() {}

  ngOnInit(): void {}
}
