import { Component, computed, inject, signal } from '@angular/core';
import { StatsCardComponent, StatsCardInput } from '../../../../../../shared/components/stats-card/stats-card.component';
import { SchoolDataAPIService } from './../../../../services/school-data.service';
import { SummaryService } from '../../services/summary.service';
import { SexStats } from '../../../../models/dashboard.interface';

@Component({
    selector: 'app-summary-stats',
    standalone: true,
    imports: [StatsCardComponent],
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class SummaryStatsComponent {
    private schoolDataService = inject(SchoolDataAPIService);
    private summaryService = inject(SummaryService);

    // Signals
    totalStudentsNumber = signal<number>(0);
    totalStudentsAttendance = signal<string>('0%');
    totalStudentsGender = signal<SexStats>({ Male: 0, Female: 0 });

    // Computed signals
    femaleStudents = computed(() => this.totalStudentsGender().Female);
    maleStudents = computed(() => this.totalStudentsGender().Male);

    // Reactive stats cards
    statsCards = computed<StatsCardInput[]>(() => [
        {
            primaryValue: this.totalStudentsNumber(),
            primaryLabel: 'Students',
            highlight: false
        },
        {
            primaryValue: this.totalStudentsAttendance(),
            primaryLabel: 'Attendance YTD',
            highlight: true
        },
        {
            primaryValue: this.femaleStudents(),
            primaryLabel: 'Female',
            secondaryValue: this.calculateGenderPercentage(this.femaleStudents()),
            highlight: false
        },
        {
            primaryValue: this.maleStudents(),
            primaryLabel: 'Male',
            secondaryValue: this.calculateGenderPercentage(this.maleStudents()),
            highlight: false
        }
        // Additional stats can be added here
    ]);

    ngOnInit(): void {
        this.fetchSexStats();
        this.fetchAttendance();
    }

    private fetchSexStats(): void {
        this.schoolDataService.getSexStats().subscribe((data) => {
            this.totalStudentsGender.set({ Male: data.Male, Female: data.Female });
            this.totalStudentsNumber.set(data.Male + data.Female);
        });
    }

    private fetchAttendance(): void {
        this.schoolDataService.getAttendance().subscribe((data) => {
            const totalAttendance = ((data.ABSENT + data.PARTIAL) / (data.ABSENT + data.PARTIAL + data.FULL)) * 100;
            this.totalStudentsAttendance.set(totalAttendance.toFixed(1) + '%');
        });
    }

    private calculateGenderPercentage(value: number): string {
        const total = this.totalStudentsNumber();
        return total ? ((value * 100) / total).toFixed(1) + '%' : '0%';
    }
}
