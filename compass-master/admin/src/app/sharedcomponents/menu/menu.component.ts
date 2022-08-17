import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

  public btnText = '';


  constructor(public route: Router) { }

  ngOnInit(): void {
    let path = this.getUserInfoFromToken();
    if (path == 'assesment') {
      this.btnText = 'Contents';
    }
    else if (path == 'contents') {
      this.btnText = 'Assesment';
    }

  }

  getUserInfoFromToken() {
    if (window.location.pathname != "") {
      var newarr = [];
      newarr = window.location.pathname.split('/');
      newarr = newarr.reverse();
      return newarr[0];
    }
  }

  logout() {
    window.localStorage.clear();
    this.route.navigate(['/login']);
  }
  gotoPage(url) {
    this.route.navigate([url]);
  }
}
