import {Component} from '@angular/core'
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './layout.component.html',
  imports: [RouterOutlet],
  selector: 'app-admin-layout',
  standalone: true
})
export class LayoutAdminComponent {}