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
  getUserDetail(user, password) {
    let data = {
      "user": user,
      "password": password
    }
  }
}
