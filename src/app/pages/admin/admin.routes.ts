import { Routes } from '@angular/router'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component'
import { authGuardFn, loginGuardFn } from '../../core/guards/auth.guard'
import { LayoutAdminComponent } from './layout.component'
import { CreateComponent } from './createProduct/create.component'
import { UpdateComponent } from './updateProduct/update.component'

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuardFn],
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'update/:id',
        component: UpdateComponent,
      },
    ],
  },
  {
    path: 'login',
    canActivate: [loginGuardFn],
    component: LoginComponent,
  },
]
