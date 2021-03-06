import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'http://oneparking.dcv.vn/api/user/';
  public startTime: any;
  public APIGlobeSetting: any = {};

  public endTime: any;
  public myParkingSlot: string;

  constructor(private http: HttpClient, public toastController: ToastController, public loadingController: LoadingController) { }

  public postWithAuth(endPoint: string, data: any) {
    console.log('postWithAuth', this.baseURL + endPoint);
    return this.http.post(`${this.baseURL}${endPoint}`, data);
  }
  public WithAuth(data: any) {
    console.log('dataWithAuth', data);
    return this.http.post(`http://oneparking.dcv.vn/api/user/login`, data);
  }
  public getWithAuth(endPoint: string) {
    console.log('getWithAuth', this.baseURL + endPoint);
    return this.http.get(`${this.baseURL}${endPoint}`);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public authPostReq(endPoint: string, data: any) {
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log('authPostReq', this.baseURL + endPoint);
    return this.http.post(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authUpdateReq(endPoint: string, data: any) {
    // data._method = 'PUT';
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log('authUpdateReq', this.baseURL + endPoint);
    return this.http.put(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authDeleteReq(endPoint: string) {
    // data._method = 'PUT';
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log('authDeleteReq', this.baseURL + endPoint);
    return this.http.delete(`${this.baseURL}${endPoint}`, { headers });
  }
  public authDeleteReqXe(endPoint: string,  data: any) {
    // data._method = 'PUT';
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    return this.http.post(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authGetReq(endPoint: string) {
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log('authGetReq', tok);
    console.log('authGetReq', this.baseURL + endPoint);
    return this.http.get(`${this.baseURL}${endPoint}`, { headers });
  }
  public forgotPsw(data) {
    return this.http.post(this.baseURL + '/user/forgot', data);
  }
  async startLoader() {
    this.loadingController.create({
      duration: 1000,
      message: ``,
    }).then(a => {
      a.present().then(() => {
      });
    });
  }
  async dismissLoader() {
    return await this.loadingController.dismiss().then(() => { });
  }
}
