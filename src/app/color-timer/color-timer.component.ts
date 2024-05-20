import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-color-timer',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule
  ],
  templateUrl: './color-timer.component.html',
  styleUrl: './color-timer.component.css',
})
export class ColorTimerComponent implements OnInit, OnDestroy {
  @Output()
  colorChange = new EventEmitter<string>();

  private colors = [
    'red',
    'blue',
    'purple'
  ]

  currentColor = 'red';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private timer? : any;

  ngOnDestroy(): void {
    this.stopTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
  }
  ngOnInit(): void {
    this.timer = setInterval(()=>this.changeColor(), 1000)
  } 

  changeColor(){
    const randomColorIndex = Math.floor(this.colors.length * Math.random());
    this.currentColor = this.colors[randomColorIndex];
    this.colorChange.emit(this.currentColor);
  }
}
