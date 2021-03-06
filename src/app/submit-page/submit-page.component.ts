import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Submit_device, FixInfo } from '../submitDevices';

import { FirbaseServiceService } from '../services/firebase-service.service';
import { DatePipe } from '@angular/common';
import { userLogin} from '../submitDevices';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';



@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css'],
  providers: [DatePipe]
})

export class SubmitPageComponent implements OnInit {
  user:userLogin = new userLogin();
  submitForm: FormGroup;
  test: String;
  rd_select: boolean = false;
  devices: string;

  loading = "";
  loading_onload = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>sending...';
  loading_none = "send";
  loading_status = false;

  submitdevice: Submit_device = new Submit_device();
  fixInfo: FixInfo = new FixInfo();


  constructor(
    private router: Router,
    fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<SubmitPageComponent>,
    private firebaseService: FirbaseServiceService,
    private datePipe: DatePipe
  ) {
    this.submitForm = fb.group({
      rd_device: new FormControl(''),
      txt_rd: new FormControl(''),
      txt_des: new FormControl(''),
      rd_choices: new FormControl(''),
      department: new FormControl(''),
      txtU_Name: new FormControl('')
    })
  }
  ngOnInit() {
    this.loading = this.loading_none;
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
  // back_Clicked() {
  //   // window.alert(this.submitForm.value.txt_rd);
  //   this.router.navigate(['home']);
  // }
  rd_changed(event: MatRadioChange) {
    if (event.source.id == "rd03") {
      this.rd_select = true;
    } else {
      this.rd_select = false;
    }

  }
  submit() {
    this.loading_status = true;
    this.loading = this.loading_onload;
    if (this.rd_select) {
      this.devices = this.submitForm.value.txt_rd;
    } else {
      this.devices = this.submitForm.value.rd_device;
    }
    let data = {
      "UID": sessionStorage.getItem("user_id"),
      "U_NAME": sessionStorage.getItem("user_name"),
      "DEPARTMENT": this.user.department,
      "DEVICES": this.devices,
      "DESCRIPTION": this.submitForm.value.txt_des,
      "IMPORTANT": this.submitForm.value.rd_choices,
      "ITEM_STATUS": "1"
    }
    if (data.DEVICES != "") {
      if (data.DESCRIPTION != "") {
        if (data.IMPORTANT != "") {
            this.submitdevice.device = this.devices;
            this.submitdevice.description = this.submitForm.value.txt_des;
            this.submitdevice.priotity = this.submitForm.value.rd_choices;
            this.submitdevice.request_em = this.user;
            this.fixInfo.device_status = "wait for review";
            this.fixInfo.status = "ລໍຖ້າສ້ອມແປງ";
            this.fixInfo.em_log = [];
            this.fixInfo.fix_note = null;
            this.submitdevice.fix_em = null;
            this.submitdevice.fix_info = this.fixInfo;
            this.submitdevice.submit_date = Date.now();
            this.submitdevice.item_status = "wait for review";
            this.submitdevice.success = 0;
            this.firebaseService.createSubmitDevices(this.submitdevice);

            window.alert("Success !")
            this.dialogRef.close({ "status": "success" });
        } else {
          this.loading_status = false;
          this.loading = this.loading_none;
          window.alert("please select status");
        }
      } else {
        this.loading_status = false;
        this.loading = this.loading_none;
        window.alert("please input valid description");
      }
    } else {
      this.loading_status = false;
      this.loading = this.loading_none;
      window.alert("please select device");
    }

  }
  close() {
    this.dialogRef.close({ "status": "none" });
  }
}
