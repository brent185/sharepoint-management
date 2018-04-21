import { Component, OnInit } from '@angular/core';
import { SiteCollection } from '../site-collection';

@Component({
  selector: 'app-site-collection',
  templateUrl: './site-collection.component.html',
  styleUrls: ['./site-collection.component.css']
})
export class SiteCollectionComponent implements OnInit {

    siteCollection: SiteCollection = {
      url: 'http://testsite.com',
      newUrl: ''
    }

  constructor() { }

  ngOnInit() {
  }

}
