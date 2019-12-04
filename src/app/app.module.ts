import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
//firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth'
//Components
import { TodosComponent } from './component/todos/todos.component';
import { TodosService } from './services/todos.service';
import { NavbarComponent } from './component/navbar/navbar.component';

//Router
import { RouterModule, Routes } from '@angular/router';
import { AddTodosComponent } from './component/add-todos/add-todos.component';
import { LoginComponent } from './component/login/login.component';
//services
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
//resolvers
import { IsLoggedIn } from './services/Resolvers/login.resolve';
import { TodoResolver } from './services/Resolvers/todo.resolver';




const appRoute: Routes = [
  { path: '', component: LoginComponent, resolve: [IsLoggedIn] },
  { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddTodosComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddTodosComponent, canActivate: [AuthGuard] , resolve : {data : TodoResolver}},
  // { path: '**', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    NavbarComponent,
    AddTodosComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [TodosService, AuthService, AuthGuard, IsLoggedIn, TodoResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
