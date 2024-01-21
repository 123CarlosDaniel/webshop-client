import { HttpClient } from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import { environment } from '../../../environments/environment'
import { Category, Product } from '@models/product.model'

@Injectable({
  providedIn: 'root' 
})
export class ProductService {

  private http = inject(HttpClient)

  saveProduct(product: FormData) {
    return this.http.post(environment.productsUrl, product)
  }

  updateProduct(id: string, product: FormData) {
    return this.http.patch(`${environment.productsUrl}/${id}`, product)
  }

  getAllProducts(category? : string , sort?: string) {
    let url = `${environment.productsUrl}?category=${category || "all"}${sort ? `&sort=${sort}`: ''}`
    return this.http.get<Product[]>(url)
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.productsUrl}/${id}`)
  }

  deleteProduct(id: number){
    return this.http.delete<void>(`${environment.productsUrl}/${id}`)
  }

  getCategories() {
    return this.http.get<Category[]>(`${environment.baseApiUrl}/categories`)
  }
}