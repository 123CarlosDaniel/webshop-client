import { Component, inject } from '@angular/core'
import { MatGridListModule } from '@angular/material/grid-list'
import { Product } from '@models/product.model'
import { CardComponent } from '../components/card/card.component'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { ProductService } from '@services/product.service'

@Component({
  templateUrl: './main.component.html',
  imports: [
    MatGridListModule,
    CardComponent,
    MatButtonModule,
    RouterLink
  ],
  selector: 'app-main',
  standalone: true,
})
export class MainComponent {
  private productService = inject(ProductService)
  products: Product[]

  getProducts() {
    this.productService.getAllProducts().subscribe(_products => {
      this.products = _products
    })
  }

  ngOnInit() {
    this.getProducts()   
  }

  onUpdateList() {
    this.getProducts()
  }

}
