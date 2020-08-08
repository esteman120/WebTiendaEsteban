import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class StoreService {
  Url: string;

  constructor(private http: HttpClient) {
    this.Url = environment.url;
  }

  async GetCategories(): Promise<any> {

    const header = {
      'Accept': 'application/json; odata=verbose',
      'Content-Type': 'application/json',
    }
    return await this.http.get(this.Url + '/category', { headers: header }).toPromise();
  }

  async GetProductXCategory(idCategory){

    const header = {
      'Accept': 'application/json; odata=verbose',
      'Content-Type': 'application/json',
    }
    return await this.http.get(`${this.Url}/products/productCategory/${idCategory}`, { headers: header }).toPromise();
  }

  async GetProduct(){
    const header = {
      'Accept': 'application/json; odata=verbose',
      'Content-Type': 'application/json',
    }
    return await this.http.get(`${this.Url}/products`, { headers: header }).toPromise();
  }

  async GetCustomer(email){
    const header = {
      'Accept': 'application/json; odata=verbose',
      'Content-Type': 'application/json',
    }
    // const body = { email }
    return await this.http.get(`${this.Url}/client/?email=${email}`, { headers: header}).toPromise();
  }

  async SaveCustomer(body){
    const header = {
      'Accept': 'application/json; odata=verbose',
      'Content-Type': 'application/json',
    }
    

    return await this.http.post(`${this.Url}/client/create`, body, { headers: header}).toPromise();
  }
}