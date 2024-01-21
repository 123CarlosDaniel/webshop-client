import { Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { ProductBoxComponent } from '@components'
import { MatGridListModule } from '@angular/material/grid-list'
import { CurrencyPipe } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Product } from '@models/product.model'
import { Subscription } from 'rxjs'
import { CartService } from '@services/cart.service'
import { ProductService } from '@services/product.service'

@Component({
  templateUrl: './details.component.html',
  selector: 'app-details',
  imports: [
    MatCardModule,
    ProductBoxComponent,
    MatGridListModule,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  standalone: true,
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  idProduct: number
  product: Product | undefined
  moreProducts: Product[] | undefined

  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private productSubscription: Subscription | undefined

  private moreProductsSubscription: Subscription | undefined

  ngOnInit() {
    this.route.params.subscribe((_params) => {
      this.idProduct = _params['id']
      if (this.productSubscription) {
        this.productSubscription.unsubscribe()
      }

      this.productSubscription = this.productService
        .getProduct(this.idProduct)
        .subscribe((_product) => {
          this.product = _product
        })
    })
    this.moreProductsSubscription = this.productService
      .getAllProducts()
      .subscribe((_products) => {
        this.moreProducts = _products
      })
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    }

    if (this.moreProductsSubscription) {
      this.moreProductsSubscription.unsubscribe()
    }
  }

  addProduct(item: Product) {
    this.cartService.addToCart({
      imageUrl: item.imageUrl,
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    })
  }
}
