import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MoviesComponent } from "./movies/movies.component";


const routes: Routes = [
  {path: 'movies', component: MoviesComponent},  
  {path: 'contact', component: ContactFormComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
