import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'

@Component({
  templateUrl: './cancel.component.html',
  standalone: true,
  selector: 'app-checkout-cancel',
  imports: [MatCardModule, MatButtonModule, RouterLink, MatIconModule],
})
export class CancelComponent {}
