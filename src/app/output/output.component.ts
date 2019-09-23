import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputComponent implements OnInit, OnDestroy {

  constructor(private counter: CounterService, private changeDetector: ChangeDetectorRef) { }

  @Input() text: string;
  currentCount: number;
  subscription;

  ngOnInit(): void {
    this.subscription = this.counter.getCount().subscribe(
      res => {
        // detect changes for this component and children
        this.changeDetector.detectChanges();
        this.currentCount = res.value;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
