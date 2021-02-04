import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.initLayout();
  }

  initLayout(): void {
    const sidebar: any = this.document.getElementById('mySidebar');
    const overlay: any = this.document.getElementById('myOverlay');

    this.document.getElementById('toggleSidebar').addEventListener('click', () => {
      if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
        overlay.style.display = 'none';
      } else {
        sidebar.style.display = 'block';
        overlay.style.display = 'block';
      }
    });
    overlay.addEventListener('click', () => {
      sidebar.style.display = 'none';
      overlay.style.display = 'none';
    });
  }

}
