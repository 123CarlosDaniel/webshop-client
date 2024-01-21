import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDrawer } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'

@Component({
  standalone: true,
  templateUrl: './products-header.component.html',
  selector: 'app-products-header',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class ProductsHeaderComponent {

  @Input() 
  drawer: MatDrawer

  @Output()
  onColumnsCountChange = new EventEmitter<number>()

  columnsUpdated(colsNum: number) {
    this.onColumnsCountChange.emit(colsNum)
  }
}
