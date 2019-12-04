import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TodosService } from '../todos.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable()
export class TodoResolver implements Resolve<any>{
    userId;
    id;
    User;
    constructor(

        private authService: AuthService,
        private todoService: TodosService,
        private afdatabase: AngularFireDatabase,
        private auth : AngularFireAuth

    ) {
    //   this.auth.authState.subscribe(user => {
    //       this.User = user
    //   }) 
        
    


    }

    resolve(route: ActivatedRouteSnapshot):Observable<any> | Promise<any> | any  {
       
       
        //    this.afdatabase.list('Todo/oLqQ0D9YsUcyAi0psU3uNrQEy4l1/-LvBVEVaCEe854jBa1H4').snapshotChanges().subscribe(data => )
       return this.todoService.fetchTodoToEdit(route.params['id']).pipe(take(1))
        // return {data1:'12'}
        
      
        

    }
}