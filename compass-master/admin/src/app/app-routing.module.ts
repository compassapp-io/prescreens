import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './sharedcomponents/menu/menu.component';
import { AssesmentsComponent } from './pages/assesments/assesments.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'assesment', component: AssesmentsComponent },
  { path: 'contents', component: ContentsComponent },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
