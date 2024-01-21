import { Component, Input, inject} from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'

import { IconsModule } from '@shared/icons/icons.module'
import { CurrencyPipe } from '@angular/common'
import { RouterLink, Router, NavigationEnd } from '@angular/router'
import { Cart, CartItem } from '@models/cart.model'
import { CartService } from '@services/cart.service'
import { Subscription } from 'rxjs'
import { TokenService } from '@services/token.service'
import { AuthService } from '@services/auth.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    IconsModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  providers: [AuthService]
})
export class NavbarComponent {
  private cartService = inject(CartService)
  private router = inject(Router)
  private authService = inject(AuthService)
  private tokenService = inject(TokenService)

  private routeSubscription: Subscription
  cartButtonVisible = true
  logoutVisible = false

  private _cart: Cart = {items: []}
  itemsQuantity = 0
  
  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart
    this.itemsQuantity = cart.items
    .map(item => item.quantity)
    .reduce((prev, curr) => prev + curr, 0)
  }

  getTotal(items: CartItem[]) {
    return this.cartService.getTotal(items)
  }
  
  ngOnInit() {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateVisibilityButtons()
      }
      const token = this.tokenService.getToken()
      this.logoutVisible = token ? true : false
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }

  updateVisibilityButtons() {
    this.cartButtonVisible = !this.router.url.includes("admin")
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
