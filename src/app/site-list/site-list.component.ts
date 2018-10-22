import { Component, OnInit } from '@angular/core';
import { Site } from '../site';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  sites: Site[];
  selectedSite: Site;

  onSelect(site: Site): void {
    this.selectedSite = site;
  }
  constructor() { }

  ngOnInit() {
  }
}
