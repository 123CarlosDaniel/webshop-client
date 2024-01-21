import { CurrencyPipe, NgOptimizedImage } from '@angular/common'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { Product } from '@models/product.model'
import { RouterLink } from '@angular/router'

@Component({
  standalone: true,
  templateUrl: './product-box.component.html',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    CurrencyPipe,
    RouterLink,
  ],
  selector: 'app-product-box',
})
export class ProductBoxComponent {
  @Input()
  product: Product | undefined

  @Output()
  onAddToCart = new EventEmitter()

  addToCart() {
    this.onAddToCart.emit(this.product)
  }
}
