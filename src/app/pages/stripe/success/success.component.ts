import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'

@Component({
  templateUrl: './success.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatIconModule],
  selector: 'app-checkout-success',
})
export class SuccessComponet {}
