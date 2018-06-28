import { Component, OnInit } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipPosition} from '@angular/material';
  
@Component({
  selector: 'app-my-sites',
  templateUrl: './my-sites.component.html',
  styleUrls: ['./my-sites.component.css', './../../global.css']
})
export class MySitesComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  constructor() { }

  ngOnInit() {
  }

}
