import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public items = [];

  public constructor(private http: HttpClient) { }

  public addToCart(product) {
    this.items.push(product);
  }

  public getItems() {
    return this.items;
  }

  public clearCart() {
    this.items = [];
    return this.items;
  }

  public getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}
