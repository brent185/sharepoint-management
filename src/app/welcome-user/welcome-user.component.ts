import { Component, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})

export class WelcomeUserComponent implements OnInit {

  private displayName;
  
    constructor(private appService: AppService) { 
      this.appService.getLoggedInUser().subscribe(u => { 
        if(u){
          this.displayName = u.DisplayName;
        }      
      });
    }
  

  ngOnInit() {
  }

}
