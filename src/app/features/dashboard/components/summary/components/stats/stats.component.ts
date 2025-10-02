import { Component, computed, inject } from '@angular/core';
import { StatsCardComponent, StatsCardInput } from '../../../../../../shared/components/stats-card/stats-card.component';
import { SchoolDataService } from './../../../../services/school-data.service';
import { SummaryService } from '../../services/summary.service';

@Component({
    selector: 'app-summary-stats',
    standalone: true,
    imports: [StatsCardComponent],
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class SummaryStatsComponent {
    private schoolDataService = inject(SchoolDataService);
    private summaryService = inject(SummaryService);

    totalStudents = computed(() => this.summaryService.totalStudentsNumber());
    femaleStudents = computed(() => this.summaryService.totalStudentsGender().Female);
    maleStudents = computed(() => this.summaryService.totalStudentsGender().Male);

    statsCards: StatsCardInput[] = [
        {
            primaryValue: this.totalStudents(),
            primaryLabel: 'Students',
            highlight: false
        },
        {
            primaryValue: this.summaryService.totalStudentsAttendance(),
            primaryLabel: 'Attendance YTD',
            highlight: true
        },
        {
            primaryValue: this.femaleStudents(),
            primaryLabel: 'Female',
            secondaryValue: this.calculatePercentage(this.femaleStudents()),
            highlight: false
        },
        {
            primaryValue: this.maleStudents(),
            primaryLabel: 'Male',
            secondaryValue: this.calculatePercentage(this.maleStudents()),
            highlight: false
        }
        // Additional stats can be added here
    ]; 
    
    
    
    
    // Helper to calculate percentage
    private calculatePercentage(value: number): string {
        const total = this.totalStudents();
        return total ? ((value * 100) / total).toFixed(1) + '%' : '0%';
    }
}
