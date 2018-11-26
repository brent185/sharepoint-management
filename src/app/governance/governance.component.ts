import { Component, OnInit, OnDestroy} from '@angular/core';
import { AppService } from './../globaldata.service';
import { ActivatedRoute} from '@angular/router';
import { KeyValuePipe } from '@angular/common';
@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.css']
})

export class GovernanceComponent implements OnInit, OnDestroy {
  public siteComplianceData = null;
  public xSub = null;
  public dataSubscription = null;
  public nonCompliantCount: number = 0;

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
          const spId = params['siteCollectionSpId'];      
          
          if(spId){
            this.Init(spId);
          }else{
            let lastSiteSpId = this.appService.GetLastSiteLoadedSPID();
            if(lastSiteSpId){
              this.Init(lastSiteSpId);
            }            
          }
      }
    );
  }

  ngOnDestroy(){
    if(this.dataSubscription){
      this.dataSubscription.unsubscribe();
    }    
  }

  Init(spId: string){
    
    // this.xSub = this.appService.GetSiteCollectionBySpId(spId).subscribe(data => {
      let data = this.appService.GetSiteCollectionBySpId(spId);
      if(data){
        console.info("SITE: " + console.info(data));
        this.dataSubscription = this.appService.GetAllComplianceData(data.SiteID).subscribe(compData => {
          if(compData){
            this.nonCompliantCount = 0;
            compData.forEach(e => {

              if(e.IsCompliant === false){
                this.nonCompliantCount++;
              }
              let Display = [];
    
              e.ComplianceData.forEach(d => {   
                let cData = [];                             
                Object.keys(d).forEach(f => {
                  
                  let propName = f;
    
                  console.log(`key=${f}  value=${d[f]}`);
    
                  f = f.replace(/([A-Z])/g, ' $1').trim()
                  cData.push({'Name': f, 'Value': d[propName]});
                  
                });
                console.info("d: " + console.info(d.Display)); 
                Display.push(cData);
              });
              e.DisplayData = Display;
              
            });
            
            this.siteComplianceData = compData;
            console.info("SCD: " + console.info(this.siteComplianceData));
            if(this.dataSubscription){
              this.dataSubscription.unsubscribe();
            }        
          }
          //if(this.xSub){
            
          //}        
        }); 
        if(this.xSub){
          this.xSub.unsubscribe();
          console.info("UNSUB");
        }
          
      }
    //  });


  }
}
