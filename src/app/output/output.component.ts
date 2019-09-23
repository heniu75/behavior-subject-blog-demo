import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CounterService, Count } from '../services/counter.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputComponent implements OnInit {

  constructor(private counter: CounterService) {}

  @Input()
  public text: string;

  currentCount$: Observable<Count>;

  ngOnInit(): void {
    this.currentCount$ = this.counter.getCount();
  }
}
