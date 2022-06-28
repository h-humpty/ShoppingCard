import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Cart } from 'app/types/index';
import { Subject, Observable } from 'rxjs';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  subjectNotifier: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) {}

  sendUpdate(message: string) {
    this.subjectNotifier.next({ text: message });
  }

  getUpdate(): Observable<any> {
    return this.subjectNotifier.asObservable();
  }

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
  deleteItem(id: number) {
    return this._http.delete(`${apiURL}/shoppingcart/${id}/`);
  }
}
