import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { YearGroupStats, YearGroupAttendance, SexStats, AttendanceStats, Student } from '../models/dashboard.interface';

@Injectable({
    providedIn: 'root'
})
export class SchoolDataMockService {
    getStudentsYearGroup(): Observable<YearGroupStats> {
        return of({
            test: { Male: 1 },
            'Groep 7': { Female: 4 },
            'Year 7': { Female: 24, Male: 29 },
            'Groep 8': { Male: 2 },
            'Year 8': { Female: 22, Male: 19 },
            'Peuters 1': { Female: 1 },
            'Groep 5': { Male: 1, Female: 2 },
            Reception: { Female: 15, Male: 24 },
            'Year 9': { Male: 27, Female: 25 },
            'Year 13': { Male: 23, Female: 21 },
            'Groep 6': { Female: 1, Male: 1 },
            'Year 12': { Male: 21, Female: 29 },
            'Year 3': { Female: 28, Male: 26 },
            'Year 11': { Female: 17, Male: 35 },
            'Groep 4': { Male: 1, Female: 1 },
            Nursery: { Female: 7, Male: 13 },
            'Year 4': { Male: 26, Female: 42 },
            'Year 10': { Female: 17, Male: 25 },
            'Groep 1': { Male: 2 },
            'Year 5': { Female: 36, Male: 28 },
            'Year 6': { Female: 21, Male: 28 },
            'Year 1': { Female: 16, Male: 23 },
            'Year 2': { Male: 33, Female: 37 }
        });
    }

    getStudentsAttendanceYearGroup(): Observable<YearGroupAttendance> {
        return of({
            '011': 32,
            '022': 200,
            '016': 289,
            '017': 205,
            '018': 327,
            '019': 187,
            '020': 309,
            '021': 205
        });
    }

    getSexStats(): Observable<SexStats> {
        return of({
            Male: 388,
            Female: 366
        });
    }

    getAttendance(): Observable<AttendanceStats> {
        return of({
            ABSENT: 19,
            PARTIAL: 49,
            FULL: 298
        });
    }

    getStudentsDirectory(yearGroupCode?: string): Observable<{ pupilId: string; displayName: string }[]> {
        return of([
            { pupilId: '868', displayName: 'Sarah Tadros' },
            { pupilId: '869', displayName: 'Sabine Wassef' }
        ]);
    }
}
