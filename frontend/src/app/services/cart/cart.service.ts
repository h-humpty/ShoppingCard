import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Cart } from 'app/types/index';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}

  getCartList() {
    return this._http.get<Cart[]>(`${apiURL}/shoppingcart`);
  }

  addItem(data: any) {
    return this._http.post(`${apiURL}/shoppingcart/`, data);
  }

  removeItem(id: number) {
    return this._http.patch(`${apiURL}/shoppingcart/${id}/`, {
      // goods: id,
      numbers: 1,
    });
  }
}
