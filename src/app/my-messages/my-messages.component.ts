import { Component, ViewChild, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {

  displayedColumns = ['MessageType', 'Message', 'SiteUrl', 'Action'];
  dataSource: MatTableDataSource<UserMessage>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  messages: UserMessage[] = [
    {MessageType: 'Attestation', ActionUrl: '/attestation/88D79697-147F-46B8-8C3F-777E75173CF1/2', SiteUrl: 'http://it100/deploy/subsite1', Message: 'Primary Administrator confirmation is required.', Action: 'click'},
    {MessageType: 'Attestation', ActionUrl: '/attestation/DD1885B9-69AF-469E-8BAE-819EE213DE66/1', SiteUrl: 'http://it100/deploy/testsitecollection', Message: 'Secondary Administrator confirmation is required.', Action: 'click'}
  ];

  constructor() {
    // Create 100 users
    const messages: UserMessage[] = this.messages;


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(messages);
  }

  ngOnInit() {

  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface UserMessage {
  MessageType: string;
  SiteUrl: string;
  Message: string;
  Action: string;
  ActionUrl: string;
}
