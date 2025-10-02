import { inject, Injectable } from '@angular/core';
import { SchoolDataService } from '../../../services/school-data.service';
import { Observable } from 'rxjs';

@Injectable()
export class SummaryService {
    schoolDataService = inject(SchoolDataService);

    totalStudentsNumber: number = null;

    getTotalStudentNumber(): void {
        this.schoolDataService.getSexStats().subscribe((data) => {
            this.totalStudentsNumber = data.Male + data.Female;
            console.log(this.totalStudentsNumber);
        });
    }

    constructor() {
        this.getTotalStudentNumber();
    }
}
