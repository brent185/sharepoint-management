import { Component, OnInit } from '@angular/core';
// import { Sites } from '../mock-sites';
///import { SiteService } from '../site.service';
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
    // this.getSites();
  }

  getSites(): void{
//this.siteService.getSites().subscribe(sites => this.sites = sites);

    // this.sites = this.siteService.getSites();
  }

}
