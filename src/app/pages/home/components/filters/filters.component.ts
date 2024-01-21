import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { Component, EventEmitter, Output, inject } from '@angular/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { ProductService } from '@services/product.service';
import { Category } from '@models/product.model';



@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatListModule],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  private productService = inject(ProductService)

  @Output()
  sortChange = new EventEmitter<string>()

  @Output()
  categoryChange = new EventEmitter<string>()

  categories: Category[]

  onSortChange(sort: MatSelectionListChange) {
    if (sort.source._value !== null) {
      this.sortChange.emit(sort.source._value[0])
    }
  }

  onCategoryChange(category: MatSelectionListChange) {
    if (category.source._value !== null) {
      this.categoryChange.emit(category.source._value[0])
    }
  }

  ngOnInit() {
    this.productService.getCategories().subscribe((_categories) => {
      this.categories = _categories
    })
  }
}
