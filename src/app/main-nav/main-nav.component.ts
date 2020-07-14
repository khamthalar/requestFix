import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  username:string;

  @Output() logOut_Clicked:EventEmitter<any>=new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,private router: Router) {}
  logout(){
    this.logOut_Clicked.emit();
  }
  openReport() {
    this.router.navigate(['report']);
    sessionStorage.setItem('page_name', 'report');
  }
  ngOnInit() {
    this.username = sessionStorage.getItem('user_name');
  }

}
