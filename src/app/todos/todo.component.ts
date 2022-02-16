import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { Todo } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, AfterViewInit {
  @Input() todo!: Todo;
  @Output() onChange: EventEmitter<{
    id: number;
    completed: boolean;
    title: string;
  }> = new EventEmitter();
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  titleControl!: FormControl;
  @ViewChild('title') titleEl!: ElementRef<HTMLTextAreaElement>;

  ngOnInit() {
    this.titleControl = new FormControl(this.todo.title);
    this.titleControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((title) => {
        this.onChange.emit({ ...this.todo, title: title.trim() });
      });
  }

  ngAfterViewInit() {
    const el = this.titleEl.nativeElement;
    el.style.height = '1px';
    el.style.height = `${el.scrollHeight}px`;
  }

  onKeyUp() {
    const el = this.titleEl.nativeElement;
    el.style.height = '1px';
    setTimeout(() => (el.style.height = `${el.scrollHeight}px`), 1);
  }

  onCheckboxClick() {
    this.onChange.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  onButtonClick() {
    this.onDelete.emit(this.todo.id);
  }
}
