import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppWallComponent } from './components/app-wall/app-wall.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthContainComponent } from './components/auth-contain/auth-contain.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieResultComponent } from './components/movie-result/movie-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ManageListsComponent } from './components/manage-lists/manage-lists.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { SearchListsComponent } from './components/search-lists/search-lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { BoardsWallComponent } from './components/boards-wall/boards-wall.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MovieCommentSectionComponent } from './components/movie-comment-section/movie-comment-section.component';
import { DiscoverComponent } from './components/discover/discover.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CastCrewComponent } from './components/cast-crew/cast-crew.component';
import { DonateComponent } from './components/donate/donate.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';





@NgModule({
  declarations: [
    AppComponent,
    AppWallComponent,
    LoginComponent,
    RegisterComponent,
    AuthContainComponent,
    SearchComponent,
    MovieResultComponent,
    CreateListComponent,
    ManageListsComponent,
    SearchListsComponent,
    BoardsWallComponent,
    PostComponent,
    CommentComponent,
    AddPostComponent,
    MovieCommentSectionComponent,
    DiscoverComponent,
    CastCrewComponent,
    DonateComponent,
    AdminPageComponent,
    
  
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
   
    ReactiveFormsModule,
    AuthModule.forRoot({...environment.auth0,
      httpInterceptor: {
        allowedList: [`${environment.apiUri}/movies`],
      },}),
    BrowserAnimationsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
