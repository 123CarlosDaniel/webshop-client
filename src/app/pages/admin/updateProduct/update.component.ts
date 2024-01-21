import { Component, inject } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { ProductService } from '@services/product.service'
import { ActivatedRoute } from '@angular/router'

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  styleUrl: './styles.css',
})
export class UpdateComponent {
  private snackBar = inject(MatSnackBar)
  private productService = inject(ProductService)
  private router = inject(ActivatedRoute)

  showSpinner = false
  isValidForm = false
  fileValid = false

  id: string | null

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    image: new FormControl<File | null>(null, []),
  })

  matcher = new MyErrorStateMatcher()

  ngOnInit() {
    this.productForm.statusChanges.subscribe(() => {
      this.isValidForm = this.productForm.valid
    })
    this.id = this.router.snapshot.params['id']
    this.productService.getProduct(Number(this.id)).subscribe(product => {
      this.productForm.controls.name.setValue(product.name)
      this.productForm.controls.category.setValue(product.category)
      this.productForm.controls.description.setValue(product.description)
      this.productForm.controls.price.setValue(product.price)
    })
  }

  onFileChange(event: Event) {
    const file = (event.target! as HTMLInputElement).files![0]
    if (!file) return

    this.fileValid = file.type.includes('image')

    this.productForm.patchValue({
      image: file,
    })
    this.productForm.get('image')!.updateValueAndValidity({
      onlySelf: true,
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      const { name, description, price, image, category } =
        this.productForm.getRawValue()
      const formData = new FormData()
      if (image && !image.type.includes('image')) {
        this.snackBar.open(
          'Error, ingrese un formato de imagen valido',
          'Close',
          { duration: 3000 }
        )
        return
      }
      if (image) {
        formData.append('image', image, image.name)
      }
      if (name) {
        formData.append('name', name)
      }
      if (description) {
        formData.append('description', description)
      }
      if (price !== null) {
        formData.append('price', String(price))
      }
      if (category) {
        formData.append('category', category)
      }

      this.showSpinner = true
      this.productService.updateProduct(this.id!, formData).subscribe({
        next: () => {
          this.snackBar.open('Editado con exito', 'OK', { duration: 3000 })
          this.showSpinner = false
        },
        error: (err) => {
          console.log(err)
          this.snackBar.open('Error del servidor', 'Close', { duration: 3000 })
          this.showSpinner = false
        },
      })
    }
  }
}
