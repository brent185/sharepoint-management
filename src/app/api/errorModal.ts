import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'error-modal',
    templateUrl: 'errorModal.html'
  })
  
  export class ErrorDialog {

    constructor(
      public dialogRef: MatDialogRef<ErrorDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { 
        console.log("site: " + console.log(data));
      }
        
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }