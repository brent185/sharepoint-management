import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from './../globaldata.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attestation-history',
  templateUrl: './attestation-history.component.html',
  styleUrls: ['./attestation-history.component.css']
})
export class AttestationHistoryComponent implements OnInit {
  private siteId;
  private roleId;
  public historyData = null;
  public siteRoleName;

  constructor(private appService: AppService,
    public dialogRef: MatDialogRef<AttestationHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) {  
      console.info("SITEID: " + data.site + " - ROLEID:" + data.role);
      this.siteId = data.site;
      this.roleId = data.role;
      this.siteRoleName = this.appService.GetSiteRoleNameByRoleID(data.role);
      dialogRef.beforeClose().subscribe(() => { this.historyData =  null; })
    }

  ngOnInit() {
    this.historyData = null;
    this.appService.GetAttestationHistory(this.siteId, this.roleId).subscribe(history => {
      if(history){
        this.historyData = history.map(h => {
          return {
            date: this.FormatDate(h.CreatedDate),
            desc: h.LoginName + ' was ' + this.GetActivityName(h.ActivityID) + ' by ' + h.ActivityByLoginName
          }
        });        
      }
    });
  }
  
  GetActivityName(activityId: number){
    let name = null;
    
            switch(activityId){
                case 1:
                  name = "Nominated";
                break;
                case 2:
                  name = "Confirmed";
                break;
                case 3:
                  name = "Deleted";
                break;                                 
              }
    
            return name;
  }

  FormatDate(date) {
    var formattedDate = "-";
    if (date) {
        date = new Date(date);
        if (date instanceof Date && !isNaN(date.valueOf())) {
            var hours = date.getHours();
            var minutes: number = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? 0 + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            formattedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + hours + ":" + minutes + ampm;
        }
    }
    return formattedDate;
}

}
