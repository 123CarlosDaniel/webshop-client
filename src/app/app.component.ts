import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@components';
import { Cart } from '@models/cart.model';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Web Shop';
  cart: Cart = {items: []}
  private cartService = inject(CartService)

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart
    })
  }
}
