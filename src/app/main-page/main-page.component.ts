import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  requestFix_clicked(){
    sessionStorage.setItem('page_name', 'login');
    this.router.navigate(['login']);
  }
  occurrenceReport_clicked(){
    sessionStorage.setItem('page_name', 'occurrence_report');
    this.router.navigate(['occurrence_report']);
  }

}

                                                                  