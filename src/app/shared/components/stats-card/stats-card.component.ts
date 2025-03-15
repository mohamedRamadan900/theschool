import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../layout/card/card.component';

@Component({
    selector: 'app-stats-card',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './stats-card.component.html',
    styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent {
    primaryValue = input.required<string | number>();
    highlight = input<boolean | null | undefined>(false);
    primaryLabel = input<string>('');
    secondaryValue = input<string | number | null | undefined>('');
}

export interface StatsCardInput {
    primaryValue: string | number;
    highlight?: boolean;
    primaryLabel: string;
    secondaryValue?: string | number | null | undefined;
}
