import {Component} from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
  <div class="max-w-2xl m-auto flex justify-center h-[500px] items-center">
    <router-outlet/>
  </div>
  `,
  selector: 'app-checkout'
})
export class CheckoutComponent{
}