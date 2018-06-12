import { Component, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private isAdmin: boolean = false;
  
  constructor(private appService: AppService) {

    this.appService.getLoggedInUser().subscribe(u => { 
      if(u){
        this.isAdmin = u.IsAdmin;
      }      
    });
  }
   

  ngOnInit() {
  }

}
