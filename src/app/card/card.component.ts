import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Cart } from '../../types/cart';
import { Products } from '../../types/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() productList:Products[] = []
  cart:Cart[] = []
  
  cartService = inject(CartService)
 
  addToCart(item: Products, quantity: number){    
    this.cartService.addToCart(item, quantity)    
  }
}
