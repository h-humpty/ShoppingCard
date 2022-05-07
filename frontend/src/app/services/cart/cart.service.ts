import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}

  getCartList() {
    return this._http.get(`${apiURL}/shoppingcart`);
  }

  addItem(data: any) {
    return this._http.post(`${apiURL}/shoppingcart`, data);
  }
}
