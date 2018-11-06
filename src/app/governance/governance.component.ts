import { Component, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';
import { ActivatedRoute} from '@angular/router';
// import { KeyValuePipe } from '@angular/common';
@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.css']
})

export class GovernanceComponent implements OnInit {
  private siteComplianceData = null;


  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
          const spId = params['siteCollectionSpId'];      
          this.Init(20);
          // if(spId){
          //   //this.Init(spId);
          // }else{
          //   let lastSiteSpId = this.appService.GetLastSiteLoadedSPID();
          //   if(lastSiteSpId){
          //     // this.Init(lastSiteSpId);
          //   }            
          // }
      }
    );
  }

  Init(spId: number){
    this.appService.GetAllComplianceData(20).subscribe(data => {
      if(data){
        data.forEach(e => {
          e.ComplianceData.forEach(d => {
            console.info("D: " + d);
            // object: {[key: string]: string = {}
          });
        });
        this.siteComplianceData = data;
        console.info("SCD: " + data);       
      }

    });
  }
}
