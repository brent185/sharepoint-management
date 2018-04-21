import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-tree',
  templateUrl: './site-tree.component.html',
  styleUrls: ['./site-tree.component.css']
})

export class SiteTreeComponent {

  constructor() { }

  getWidth(level){
    let newLevel = level*20;
    return newLevel + "px";
    //console.log(newLevel);
  }

  toggleChildren(event, siteId){
    let x = this.list.find(x => x.id === siteId);
    if(x.isOpen){
      x.isOpen = false;
    }else{
      x.isOpen = true;
    }
    console.log(x);
  }

  // its just list data from here down
  public list = [
    {
      id: 1,
      url: '1a',
      children: [        
        { 
          id: 3,
          url: '1b', 
          level: 2,
          isOpen: true,
          children: [
            {
              id: 10,
              url: '1c',
              children: [],
              level: 3,
              isOpen: true
            }
          ]}
      ],
      level: 1,
      isOpen: true
    },
    {
      id: 2,
      url: '2a',
      level: 1,
      isOpen: true,
      children: [        
        { 
          id: 3,
          url: '2b', 
          level: 2,
          isOpen: true,
          children: []}
      ]
    },
  ];


}