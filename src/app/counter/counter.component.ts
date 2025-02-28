import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit, OnDestroy {

  constructor(private counter: CounterService) { }

  currentCount: number;
  subscription;

  ngOnInit(): void {
    this.subscription = this.counter.getCount().subscribe(
      res => {
        this.currentCount = res.value;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  increment(): void {
    this.counter.setCount(this.currentCount, 1);
  }

  decrement(): void {
    this.counter.setCount(this.currentCount, -1);
  }

  reset(): void {
    this.counter.resetCount();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
