import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/list-product/list-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';


const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'edit-product/:id', component: NewProductComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }