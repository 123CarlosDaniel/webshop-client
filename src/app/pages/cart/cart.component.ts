import { CurrencyPipe } from '@angular/common'
import { HttpBackend, HttpClient } from '@angular/common/http'
import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { RouterLink } from '@angular/router'
import { Cart, CartItem } from '@models/cart.model'
import { CartService } from '@services/cart.service'
import { Subscription } from 'rxjs'
import { environment } from '../../../environments/environment'
import { loadStripe } from '@stripe/stripe-js'

@Component({
  templateUrl: './cart.component.html',
  selector: 'app-cart',
  imports: [
    MatCardModule,
    MatTableModule,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  standalone: true,
})
export class CartComponent {
  cart: Cart = {items: []}
  private cartService = inject(CartService)
  private http = inject(HttpClient)

  dataSource: Array<CartItem> = []
  private cartSubscription: Subscription | undefined

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]

  ngOnInit() {
    this.cartSubscription = this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart
      this.dataSource = _cart.items
    })
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe()
    }
  }

  getTotal(items: Array<CartItem>) {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item)
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout() {
    this.http
    .post(environment.checkoutUrl, this.cart.items)
    .subscribe({
      next: async (res: any) => {
        const stripe = await loadStripe(environment.stripePublicToken)
        stripe?.redirectToCheckout({
          sessionId: res.id
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
