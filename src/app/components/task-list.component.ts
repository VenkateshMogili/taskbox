import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';
import { Store } from '@ngxs/store';
import { ArchiveTask, PinTask } from '../state/task.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  template: `
    <app-pure-task-list
      [tasks]="tasks$ | async"
      (onArchiveTask)="archiveTask($event)"
      (onPinTask)="pinTask($event)"
    ></app-pure-task-list>
  `,
})
export class TaskListComponent {
  //@Input() tasks: Task[] = [];
  tasks$?: Observable<any>;
  constructor(private store: Store) {
    this.tasks$ = store.select((state) => state.taskbox.tasks);
  }

  archiveTask(id: any) {
    this.store.dispatch(new ArchiveTask(id));
  }

  pinTask(id: any) {
    this.store.dispatch(new PinTask(id));
  }
}
