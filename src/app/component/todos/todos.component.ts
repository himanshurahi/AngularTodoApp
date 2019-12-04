import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos = []
  loading = true
  constructor(private todosService: TodosService, private route: ActivatedRoute, private router: Router, private db :AngularFireDatabase) { }
  ngOnInit() {
    
    console.log('todos compo')
    // let arrayq = []
    // this.todosService.fetchAgain().subscribe(data => {
    //   data.docs.map(i => {
    //     arrayq.push({ id: i.id, ...i.data() })
    //   })
    //   this.todos = arrayq
    // })
  
    this.todosService.newfetchTodo().subscribe(data => {
      console.log('fetching Data...')
      let arr = []
      arr.push(...data)
      this.todos = arr
      this.loading = false
    })

    // this.todosService.getTodos().subscribe(todo => {
    //   this.todos = todo
    //   console.log(this.todos)
    // })
    

    // this.db.list('Todos').push({title : 'test2'})

    // this.todos = this.todosService.getExtraTodos()
  }

  onTodo(todo) {
    console.log(this.todos)
    this.router.navigate(['/edit', todo.id])
    this.todosService.TodoToEdit(todo)
  }





}
