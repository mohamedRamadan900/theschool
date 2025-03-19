import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss'
})
export class LegendComponent {
  @Input() legendData: Array<{label: string, color: string}> = [];
  @Output() legendItemClick = new EventEmitter<number>();

  handleLegendClick(index: number) {
    this.legendItemClick.emit(index);
  }
}
