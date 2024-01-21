import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { CartComponent } from './pages/cart/cart.component'
import { DetailsComponent } from './pages/details/details.component'
import { LayoutComponent } from './pages/layout/layout.component'
import { loginGuardFn } from './core/guards/auth.guard'
import { CheckoutComponent } from './pages/stripe/checkout.component'
import { SuccessComponet } from './pages/stripe/success/success.component'
import { CancelComponent } from './pages/stripe/cancel/cancel.component'

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [loginGuardFn],
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'details/:id', component: DetailsComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'checkout-test',
    component: CheckoutComponent,
    children: [
      {path: 'success', component: SuccessComponet},
      {path: 'cancel', component: CancelComponent}
    ]
  },
  { path: '**', redirectTo: '' },
]
