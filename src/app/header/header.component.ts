import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartCount: number = 0
  cartService = inject(CartService)

  constructor() {}

  ngOnInit(): void {    
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
