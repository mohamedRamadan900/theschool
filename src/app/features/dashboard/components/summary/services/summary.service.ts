import { computed, inject, Injectable, signal } from '@angular/core';
import { IStudentDirectoryTable } from '../components/student-directory/student-directory.component';
import { IStudentDirectory, SchoolDataAPIService } from '../../../services/school-data.service';
import { Observable, tap } from 'rxjs';
import { IStudentGender } from '../../../models/dashboard.interface';

@Injectable()
export class SummaryService {
    schoolDataService = inject(SchoolDataAPIService);

    allStudents = signal<IStudentDirectory[]>([]);
    filters = signal<SummaryDashboardFilters>({});

    filteredStudents = computed(() => {
        console.log(this.filters());
        const students = this.allStudents();
        const { gender, yearGroup } = this.filters();
        return students.filter((student) => {
            let match = true;
            if (gender) match = match && student.gender === gender;
            if (yearGroup) match = match && student.yearGroup === yearGroup;
            return match;
        });
    });

    fetchStudentDirectory(): Observable<IStudentDirectory[]> {
        return this.schoolDataService.getStudentsDirectory().pipe(
            tap((data) => {
                this.allStudents.set(data);
            })
        );
    }

    /** Set gender filter */
    setGenderFilter(gender?: IStudentGender) {
        this.filters.update((f) => ({ ...f, gender: gender ?? undefined }));
    }

    /** Set yearGroup filter */
    setYearGroupFilter(yearGroup?: string) {
        this.filters.update((f) => ({ ...f, yearGroup: yearGroup ?? undefined }));
    }

    /** Reset all filters */
    resetFilters() {
        this.filters.set({});
    }
}

export interface SummaryDashboardFilters {
    gender?: IStudentGender;
    yearGroup?: string;
}
