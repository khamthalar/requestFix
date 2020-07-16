import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  setLogin(value: boolean) {
    sessionStorage.setItem('logedin', value.toString());
  }
  get isLogin() {
    return JSON.parse(sessionStorage.getItem('logedin') || 'false');
  }
  setMain(value:boolean){
    sessionStorage.setItem('isMain',value.toString());
  }
  get isMain(){
    return JSON.parse(sessionStorage.getItem('isMain' || 'false'));
  }
}
