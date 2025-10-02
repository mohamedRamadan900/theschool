import { inject, Injectable, signal } from '@angular/core';
import { SchoolDataService } from '../../../services/school-data.service';
import { Observable } from 'rxjs';
import { SexStats } from '../../../models/dashboard.interface';

@Injectable()
export class SummaryService {
    schoolDataService = inject(SchoolDataService);
    totalStudentsNumber = signal<number>(0);
    totalStudentsAttendance = signal<string>('');
    totalStudentsGender = signal<SexStats>(null);

    constructor() {
        this.getTotalStudentsNumber();
        this.getTotalAttendance();
    }

    private getTotalStudentsNumber(): void {
        this.schoolDataService.getSexStats().subscribe((data) => {
            this.totalStudentsGender.set({
                Male: data.Male,
                Female: data.Female
            });
            const totalStudentsNumber = data.Male + data.Female;
            this.totalStudentsNumber.set(totalStudentsNumber);
        });
    }

    private getTotalAttendance(): void {
        this.schoolDataService.getAttendance().subscribe((data) => {
            const totalAttendancePercentage = (data.ABSENT + data.PARTIAL) / data.FULL;
            const totalAttendance = (totalAttendancePercentage * 100).toFixed(2);
            this.totalStudentsAttendance.set(totalAttendance + '%');
        });
    }
}
