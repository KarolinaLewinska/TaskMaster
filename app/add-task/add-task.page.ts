import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})

export class AddTaskPage implements OnInit {
  myDate: String = new Date().toISOString();
  constructor() { 
    
  }

  ngOnInit() {
  }

}
