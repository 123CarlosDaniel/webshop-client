import { Component, inject } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'

import { FiltersComponent } from './components/filters/filters.component'
import { ProductsHeaderComponent } from './components/products-header/products-header.component'
import { ProductBoxComponent } from '@components'
import {Subscription} from 'rxjs'
import { Product } from '@models/product.model'
import { CartService } from '@services/cart.service'
import { ProductService } from '@services/product.service'

const ROWS_HEIGHT: {[id: number]: number} = {3: 380, 4: 420}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    MatSidenavModule,
    FiltersComponent,
    ProductsHeaderComponent,
    MatGridListModule,
    ProductBoxComponent
  ],
})
export class HomeComponent {
  private productService = inject(ProductService)
  private cartService = inject(CartService)

  private productSubscription: Subscription | undefined

  products: Product[] | undefined

  cols = 3
  category: string | undefined 
  sort = "desc"

  rowHeight = ROWS_HEIGHT[this.cols]

  getProducts() {
    this.productSubscription = this.productService.getAllProducts(this.category, this.sort)
      .subscribe((_products) => {
        this.products = _products
      }),
      (err: Error) => {
        console.log(err)
      }
  }
  
  ngOnInit() {
    this.getProducts()
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    }
  }  

  addToCart(item: Product) {
    this.cartService.addToCart({
      imageUrl: item.imageUrl,
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    })
  }

  onSortChange(_sort: string) {
    this.sort = _sort
    this.getProducts()
  }

  onCategoryChange(_category: string) {
    this.category = _category
    this.getProducts()
  }

  onColumnsCountChange(_cols: number) {
    this.cols = _cols
  }
}
