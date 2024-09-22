import { authGuard } from './core/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // *--------------BlankLayOut------------------
  {
    path: '', canActivate: [authGuard], loadComponent: () => import('./layout/layout-blank/layout-blank.component').then((m) => m.LayoutBlankComponent), children: [
      { path: "", redirectTo: 'home', pathMatch: 'full' },
      { path: "home", loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent), title: 'Home' },
      { path: "product", loadComponent: () => import('./components/product/product.component').then((m) => m.ProductComponent), title: 'Product' },
      { path: "category", loadComponent: () => import('./components/category/category.component').then((m) => m.CategoryComponent), title: 'Category' },
      { path: "productCategory/:id", loadComponent: () => import('./components/product-category/product-category.component').then((m) => m.ProductCategoryComponent), title: 'ProductCategory' },
      { path: "brands", loadComponent: () => import('./components/brands/brands.component').then((m) => m.BrandsComponent), title: 'Brands' },
      { path: "productBrands/:id", loadComponent: () => import('./components/product-brands/product-brands.component').then((m) => m.ProductBrandsComponent), title: 'ProductBrands' },
      { path: "details/:id", loadComponent: () => import('./components/details/details.component').then((m) => m.DetailsComponent), title: 'Details' },
      { path: "cart", loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent), title: 'Cart' },
      { path: "allorders", loadComponent: () => import('./components/allorders/allorders.component').then((m) => m.AllordersComponent), title: 'AllOrder' },
      { path: "checkOut/:id", loadComponent: () => import('./components/check-out/check-out.component').then((m) => m.CheckOutComponent), title: 'CheckOut' },
      { path: "wishlist", loadComponent: () => import('./components/wishlist/wishlist.component').then((m) => m.WishlistComponent), title: 'Wishlist' },
      { path: "forgetPassword", loadComponent: () => import('./components/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent), title: 'ForgetPassword' },
    ]
  },

  // *--------------AuthLayOut------------------
  {
    path: '', loadComponent: () => import('./layout/layout-auth/layout-auth.component').then((m) => m.LayoutAuthComponent), children: [
      { path: "", redirectTo: 'login', pathMatch: 'full' },
      { path: "register", loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent), title: 'Register' },
      { path: "login", loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent), title: 'Login' },
      { path: "forgetPass", loadComponent: () => import('./components/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent), title: 'ForgetPassword' },
    ]
  },

  // *--------------NotFound------------------
  { path: "**", loadComponent: () => import('./components/notfound/notfound.component').then((m) => m.NotfoundComponent), title: 'NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
