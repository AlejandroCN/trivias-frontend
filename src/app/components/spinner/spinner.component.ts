import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-container text-primary">
      <fa-icon icon="spinner" [spin]="true" size="5x"></fa-icon>
    </div>
  `,
  styleUrls: []
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
