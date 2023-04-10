import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AppWallComponent } from './components/app-wall/app-wall.component';
import { AuthContainComponent } from './components/auth-contain/auth-contain.component';
import { BoardsWallComponent } from './components/boards-wall/boards-wall.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';




const routes: Routes = [

  
    //path:'home', component:AppComponent
    {
      path:'', component:AuthContainComponent

    },
    {
      path:'home', component:AppWallComponent, canActivate: [AuthGuard],

    },
    {
      path:'search', component: SearchComponent, canActivate: [AuthGuard]

    },
    {
      path:'board', component: BoardsWallComponent, canActivate: [AuthGuard]

    },
    {
      path:'admin', component: AdminPageComponent, canActivate: [AuthGuard]

    }

  
   
    

  
 ];

 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
