import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SubmitPageComponent } from '../submit-page/submit-page.component';
import { HttpClient } from '@angular/common/http';

import { FirbaseServiceService } from '../services/firebase-service.service';

import {map} from 'rxjs/operators';
import { Submit_device } from '../submitDevices';
import { userLogin, userContact } from '../submitDevices';
import { ItemInfoComponent } from '../dialogs/item-info/item-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  submit_device_info:any;

  deviceList:any;
  user:userLogin = new userLogin();

  constructor(
    private auth:AuthService,
    private router:Router,
    private dialog:MatDialog,
    private http:HttpClient,
    private firebaseService:FirbaseServiceService
    ) { }
  username:string;
  ngOnInit() {
    this.username = sessionStorage.getItem('user_name');
    // this.updateData();
    this.getDeviceList();
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
  logout(){
    this.auth.setLogin(false);
    sessionStorage.setItem('user_name', "");
    sessionStorage.setItem('user_id','');
    this.router.navigate(['login']);
  }
  openDialog(): void {
    // open calendar popup
    const dialogRef = this.dialog.open(SubmitPageComponent);

    // catch event popup closed
    dialogRef.afterClosed().subscribe(result => {
      if(result.status=="success"){
        // this.updateData();
      }
    });
  }
  getImg(){
    return "assets/images/wifi.svg";
  }

  getDeviceList(){
    this.firebaseService.getSubmitDevice_list_by_user().snapshotChanges().pipe(
      map(device => {
        return device.map(d => {
          const data = d.payload.doc.data() as Submit_device
          data.key = d.payload.doc.id;
          return data;
        });
      })
    ).subscribe(devicelist => {
      this.deviceList = devicelist;
    });
  }
  showFixInfo(item){
    const dialogRef = this.dialog.open(ItemInfoComponent,{ disableClose: true,data: item});
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
