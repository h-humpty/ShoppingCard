import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Goods, Category } from 'app/types/index';
import { Subject, Observable } from 'rxjs';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  subjectNotifier: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) {}

  sendUpdate(message: string) {
    this.subjectNotifier.next({ text: message }); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> {
    //the receiver component calls this function
    return this.subjectNotifier.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  listGoods() {
    return this._http.get<Goods[]>(`${apiURL}/goods/`);
  }

  addGood(data: any) {
    return this._http.post<Goods>(`${apiURL}/goods/`, data);
  }

  updateGood(data: Partial<Goods>) {
    return this._http.patch<Goods>(`${apiURL}/goods/`, data);
  }

  removeGood(id: number) {
    return this._http.delete(`${apiURL}/goods/${id}`);
  }

  listCategories() {
    return this._http.get<Category[]>(`${apiURL}/category/`);
  }

  addCategory(data: Category) {
    return this._http.post<Category>(`${apiURL}/category/`, data);
  }

  updateCategory(data: Partial<Category>) {
    return this._http.patch<Category>(`${apiURL}/category/${data.id}/`, data);
  }

  removeCategory(id: number) {
    return this._http.delete(`${apiURL}/category/${id}`);
  }

  uploadImage(formData: any) {
    return this._http.post(`${apiURL}/goodsimage/`, formData);
  }

  updateImage(formData: any) {
    return this._http.patch(`${apiURL}/goodsimage/`, formData);
  }
}
