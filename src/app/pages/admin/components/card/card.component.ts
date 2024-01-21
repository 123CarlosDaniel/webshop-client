import { ProductService } from '@services/product.service';
import { CurrencyPipe } from '@angular/common'
import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBar } from '@angular/material/snack-bar'
import { RouterLink } from '@angular/router'
import { Product } from '@models/product.model'

@Component({
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  selector: 'app-product-card',
  templateUrl: './card.component.html',
  standalone: true,
})
export class CardComponent {
  @Input()
  product: Product

  private productService = inject(ProductService)
  private snackBar = inject(MatSnackBar)
  @Output()
  updateList = new EventEmitter<void>()

  removeProduct() {
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.updateList.emit()
        this.snackBar.open('Producto eliminado correctamente', 'Close', {
          duration: 3000,
        })
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Error', 'Close', { duration: 3000 })
      },
    })
  }
}
