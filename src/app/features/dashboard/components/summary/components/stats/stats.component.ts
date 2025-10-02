import { Component } from '@angular/core';
import { StatsCardComponent, StatsCardInput } from '../../../../../../shared/components/stats-card/stats-card.component';

@Component({
    selector: 'app-summary-stats',
    imports: [StatsCardComponent],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class SummaryStatsComponent {
    statsCards: StatsCardInput[] = [
        { primaryValue: '441', primaryLabel: 'Students', highlight: false },
        { primaryValue: '96.6%', primaryLabel: 'Attendance YTD', highlight: true },
        { primaryValue: '228', primaryLabel: 'Female', secondaryValue: '51.7%', highlight: false },
        { primaryValue: '213', primaryLabel: 'Male', secondaryValue: '48.3%', highlight: false },
        { primaryValue: '201', primaryLabel: 'Boarders', secondaryValue: '45.6%', highlight: false },
        { primaryValue: '--', primaryLabel: 'EAL', secondaryValue: '--', highlight: false },
        { primaryValue: '1', primaryLabel: 'LAC', secondaryValue: '0.2%', highlight: false },
        { primaryValue: '--', primaryLabel: 'SEND ALL', secondaryValue: '--', highlight: false },
        { primaryValue: '--', primaryLabel: 'SEND EHCP', secondaryValue: '--', highlight: false }
    ];
}
