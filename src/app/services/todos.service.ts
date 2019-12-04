import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  Todos: Observable<any>
  ExtraTodo = []
  itemToEdit;
  User;
  // TodosCollection : AngularFirestoreCollection
  constructor(public af: AngularFirestore, public db: AngularFireDatabase, public afAuth: AngularFireAuth, private authService: AuthService) {

    this.authService.getUser().subscribe(user => {
      this.User = user
    })




    //  this.af.collection('Todos').get().subscribe(data => {
    //    data.docs.map(i => {
    //      console.log({id : i.id, ...i.data()})
    //      this.ExtraTodo.push({id : i.id, ...i.data()})
    //    })
    //  })

  }

  fetchAgain() {
    return this.af.collection('Todos').get()
  }

  getTodos() {
    return this.Todos
  }
  // getExtraTodos(){
  //   return this.ExtraTodo
  // }

  addTodo(data) {
    
    return this.db.list('Todos/'+this.User.uid).push(data)


  }

  TodoToEdit(todo) {
    this.itemToEdit = todo
  }

  UpdateTodo(id, data) {

    // return this.af.collection('Todos').doc(id).set(data)
    return this.db.list('Todos/'+this.User.uid).update(id, data)
  }

  DeleteTodo(id) {
    return this.db.list('Todos/'+this.User.uid).remove(id)
  }

  fetchTodoToEdit(id) {
   let uid = this.User && this.User.uid
    return this.db.object('Todos/'+uid+"/"+id).snapshotChanges().pipe(map(change => {
     return {id : change.key, ...change.payload.val()}
    }))
      
  }

  newfetchTodo() {
    return this.db.list('Todos/'+this.User.uid).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        return { id: a.payload.key, ...a.payload.val() }
      })
    }))
  }




}
