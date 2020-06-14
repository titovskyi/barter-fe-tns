import { Component, OnInit } from '@angular/core';
import { remove } from 'tns-core-modules/application-settings/application-settings';
import {Router} from "@angular/router";

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


    public logout() {
        remove('myChangeAccessToken');
        this.router.navigate(['login']);
    }

}
