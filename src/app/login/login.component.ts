import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirbaseServiceService } from '../services/firebase-service.service';
import { userLogin, userContact, device } from '../submitDevices';

import { map } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  //set txtpassword to hide text
  hide = true;

  loading = false;

  user: userLogin = new userLogin();
  device: device = new device();

  usercontact: userContact = new userContact();
  deviceInfo: any;


  constructor(private auth: AuthService, private router: Router, fb: FormBuilder,
    private firebaseService: FirbaseServiceService, private deviceService: DeviceDetectorService
  ) {
    this.loginForm = fb.group({
      txtuser: new FormControl(''),
      txtpassword: new FormControl('')
    });
  }
  ngOnInit() {
  }
  login_Clicked() {
    this.loading = true;

    let username = this.loginForm.value.txtuser;

    this.firebaseService.getUser(username).snapshotChanges().pipe(
      map(user => {
        return user.map(u => {
          const data = u.payload.doc.data() as userLogin
          data.key = u.payload.doc.id;
          return data;
        });
      })
    ).subscribe(data => {
      if (data.length == 0) {
        window.alert("Incorrect username");
        this.loading = false;
      } else if (data.length == 1) {
        if (CryptoJS.AES.decrypt(data[0].password.trim(), "admin@2k18".trim()).toString(CryptoJS.enc.Utf8) == this.loginForm.value.txtpassword) {
          this.auth.setLogin(true);
          if (data[0].status == "admin") {
            this.router.navigate(['desboard']);
            // localStorage.setItem('page_name','desboard');
            sessionStorage.setItem('page_name', 'desboard');
          } else if (data[0].status == "employee") {
            this.router.navigate(['home']);
            // localStorage.setItem('page_name','home');
            sessionStorage.setItem('page_name', 'home');
          }

          sessionStorage.setItem('user_name', data[0].name + " " + data[0].surname);
          sessionStorage.setItem('user_id', data[0].key);
          sessionStorage.setItem('userPhonenumber', data[0].contactInfo.phonenumber);
          sessionStorage.setItem('userEmailAddress', data[0].contactInfo.email);
          sessionStorage.setItem('user', JSON.stringify(data[0]));
          this.user = data[0];

          //detect login device
          this.detectDevice(data[0]);
        } else {
          window.alert("Incorrect password");
          this.loading = false;
        }
      }
    });
  }
  detectDevice(user: userLogin) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(user);
    // console.log(sessionStorage.getItem("token"));
    if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
      window.alert('please allow notification');
      return;
    }
    let token = sessionStorage.getItem("token");
    if (user.devices_login == undefined || user.devices_login.length == 0) {
      this.device.device_info = this.deviceInfo.os+"("+this.deviceInfo.browser+")";
      this.device.enable_notify = true;
      this.device.token = token;
      this.user.devices_login.push(this.device);
      this.firebaseService.updateUserLogin(user.key,{"devices_login":this.user.devices_login});
    } else {
      for(let i=0; i< this.user.devices_login.length; i++){
        if(this.user.devices_login[i].token == token){
          return;
        }
      }
      this.device.device_info = this.deviceInfo.os+"("+this.deviceInfo.browser+")";
      this.device.enable_notify = true;
      this.device.token = token;
      this.user.devices_login.push(this.device);
      this.firebaseService.updateUserLogin(user.key,{"devices_login":this.user.devices_login});
    }
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    // const isDesktopDevice = this.deviceService.isDesktop();
    // console.log(this.deviceInfo);
    // console.log(isMobile);
    // console.log(isTablet);
    // console.log(isDesktopDevice);

  }

  cancel_clicked(){
    sessionStorage.setItem('page_name','main');
    this.router.navigate(['main']);
  }
}
