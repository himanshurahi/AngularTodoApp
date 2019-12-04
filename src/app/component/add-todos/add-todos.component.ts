import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from './Todos.model'
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css']
})
export class AddTodosComponent implements OnInit {
  title: string;
  description: string;
  todos: { title: '', description: '' }
  id;
  editMode = false
  deleting = false
  updating = false
  adding = false
  constructor(private todoService: TodosService, private router: Router, private route: ActivatedRoute, private authService :AuthService) {

  }

  ngOnInit() {
   
    let todo = this.route.snapshot.data.data
    if(todo){
      this.editMode = true
      this.id = todo.id
     this.title = todo.title
     this.description = todo.description
    }

   
    // this.todoService.getTodos().subscribe(todo => {
    //   this.todos = todo
    // })
    // if (this.todoService.itemToEdit) {
    //   console.log(this.todoService.itemToEdit)
    //   this.title = this.todoService.itemToEdit.title
    //   this.description = this.todoService.itemToEdit.description
    // }



    // this.route.paramMap.subscribe(data => {
    //   this.id = data.get('id')
    //   if (this.id !== null) {
    //     this.editMode = true
    //   }
    // })
  }

  onSubmit(data) {
    if (this.editMode) {
      this.updating = true
      this.todoService.UpdateTodo(this.id, data.value).then(() => {
        this.title = ''
        this.description = ''
        this.updating = false
        this.router.navigate(['/todos'])
       
      })
    } else {
      this.adding = true
      this.todoService.addTodo({ ...data.value, date: new Date().getTime() }).then(() => {
        this.title = ''
        this.description = ''
        this.adding = false
        this.router.navigate(['/todos'])
      })
    }

  }

  onDeleteTodo() {
    
    this.deleting = true
    this.todoService.DeleteTodo(this.id).then(() => {
      this.deleting = false
      this.router.navigate(['/todos'])
    })
  }

  ngOnDestroy() {
   console.log('Component Destroy')
  }

}