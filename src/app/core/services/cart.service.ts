import { Injectable, inject } from '@angular/core'
import { Cart, CartItem } from '@models/cart.model'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private snackBar = inject(MatSnackBar)
  cart = new BehaviorSubject<Cart>({ items: [] })

  addToCart(item: CartItem) {
    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item) => _item.id == item.id)

    if (itemInCart) {
      itemInCart.quantity++
    } else {
      items.push(item)
    }
    this.cart.next({ items })

    this.snackBar.open('1 producto agregado al carrito', 'Ok', {
      duration: 3000,
    })
  }

  getTotal(items: CartItem[]) {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0)
  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this.snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    })
  }

  removeFromCart(item: CartItem) {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    )
    this.cart.next({ items: filteredItems })
    this.snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    })
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--
        if (_item.quantity === 0) {
          itemForRemoval = _item
        }
      }
      return _item
    })
    this.cart.next({ items: filteredItems });
    if (itemForRemoval) {
      this.removeFromCart(itemForRemoval)
    }
  }

}
