import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../types/cart';
import { Products } from '../../types/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[] = []
  cartKey:string = "cart"
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() { 
    if (typeof window !== 'undefined') {
      this.getCart() 
    }
  } 

  getCart() {
      const storedCart = localStorage.getItem(this.cartKey);
      this.cartCount.next(this.getCartCount())
      return this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  getCartCount() {
    return this.cart.length;
  }

  addToCart(product: Products, quantity: number):void {      
   

    let existingCart = this.cart.find(item => item.id === product.id)

    if(existingCart) {      
      existingCart.quantity = quantity
    }else {
      this.cart.push({...product, quantity})
    }

    localStorage.setItem(this.cartKey, JSON.stringify(this.cart))
    this.cartCount.next(this.getCartCount());
  }

  removeFromCart(productId: Products):void {
    let cart = this.cart.filter((item:any) => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart))
    this.cartCount.next(this.getCartCount());
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey)
    this.cartCount.next(this.getCartCount());
  }
}
