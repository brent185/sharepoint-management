import {Component} from '@angular/core';
import {Sort} from '@angular/material';
import { AppService } from './../globaldata.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  public reportData;

  constructor(private appService: AppService) {
    this.appService.GetSiteCollectionReport().subscribe(d => {
      this.reportData = d;
      console.info("REPORT: " + console.info(d));
             
    });
  }


  ExportToCSV(){
    this.JSONToCSVConvertor(this.reportData, "Attestation Data", true);
  }

  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;    
    var CSV = '';    
    if (ShowLabel) {
        var row = "";
                
        for (var index in arrData[0]) {            
            row += index + ',';
        }

        row = row.slice(0, -1);        
        CSV += row + '\r\n';
    }
        
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
                
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);            
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   

    var fileName = ReportTitle.replace(/ /g,"_");   
    
    var uri = 'data:text/csv;charset=utf-8,' + CSV;
    
    var link = document.createElement("a");    
    link.href = uri;
    
    link.download = fileName + ".csv";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

}

