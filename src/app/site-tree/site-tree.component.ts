import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-tree',
  templateUrl: './site-tree.component.html',
  styleUrls: ['./site-tree.component.css']
})

export class SiteTreeComponent {

  private i = 0;

  public list = [
    {
      id: 1,
      url: '1a',
      isVisible: true,
      isEven: false,
      children: [
        {
          id: 3,
          url: '1b',
          level: 2,
          isOpen: true,
          isVisible: true,
          isEven: false,
          children: [
            {
              id: 10,
              isVisible: true,
              url: '1c',
              children: [],
              level: 3,
              isOpen: true,
              isEven: false,
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
      isVisible: true,
      isOpen: true,
      isEven: false,
      children: [
        {
          id: 30,
          url: '2b',
          level: 2,
          isVisible: true,
          isOpen: true,
          isEven: false,
          children: []}
      ]
    },
  ];

  constructor() { }

  getWidth(level) {
    const newLevel = level * 20;
    return newLevel + 'px';
    // console.log(newLevel);
  }

  toggleChildren(event, siteId) {
    // const x = this.list.find(a => a.id === siteId);
    const x = this.findById(this.list, siteId);

    if (x.isOpen) {
      x.isOpen = false;
      //this.hideChildren(x);
    } else {
      x.isOpen = true;
      //this.showChildren(x);
    }
    //this.setEvenOdd(1);
  }

  setEvenOdd(i) {
      this.list.forEach(s => {
        if (s.isVisible) {
          if (this.isOdd(i)) {
            s.isEven = false;
          }
          i++;
          s.children.forEach
        }
      });

      parent.children.forEach(c => {
        c.isVisible = false;
        if (c.children) {
          this.hideChildren(c);
        }
      });
  }

  isOdd(num) {
    return num % 2;
  }

  hideChildren(parent) {
    if (parent.children) {
      parent.children.forEach(c => {
        c.isVisible = false;
        if (c.children) {
          this.hideChildren(c);
        }
      });
    }
  }

  showChildren(parent) {
    if (parent.children) {
      parent.children.forEach(c => {
        c.isVisible = true;
        if (c.children) {
          this.hideChildren(c);
        }
      });
    }
  }

  findById(o, id) {
    if (o.id === id ) {
      return o;
    }
    let result, p;

    for (p in o) {
        if ( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
            result = this.findById(o[p], id);
            if (result) {
                return result;
            }
        }
    }
    return result;
 }
}
