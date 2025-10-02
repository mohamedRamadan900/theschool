import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { YearGroupStats, YearGroupAttendance, SexStats, AttendanceStats, Student } from '../models/dashboard.interface';

@Injectable({
    providedIn: 'root'
})
export class SchoolDataMockService {
    getStudentsYearGroup(): Observable<YearGroupStats> {
        return of({
            test: { Male: 10 },
            'Groep 7': { Female: 34 },
            'Year 7': { Female: 24, Male: 29 },
            'Groep 8': { Male: 22 },
            'Year 8': { Female: 22, Male: 19 },
            'Peuters 1': { Female: 11 },
            'Groep 5': { Male: 15, Female: 2 },
            Reception: { Female: 15, Male: 24 },
            'Year 9': { Male: 27, Female: 25 },
            'Year 13': { Male: 23, Female: 21 },
            'Groep 6': { Female: 17, Male: 1 },
            'Year 12': { Male: 21, Female: 29 },
            'Year 3': { Female: 28, Male: 26 },
            'Year 11': { Female: 17, Male: 35 },
            'Groep 4': { Male: 11, Female: 1 },
            Nursery: { Female: 7, Male: 13 },
            'Year 4': { Male: 26, Female: 42 },
            'Year 10': { Female: 17, Male: 25 },
            'Groep 1': { Male: 32 },
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
            { pupilId: '868', displayName: 'Sarah Tadros', yearGroup: 'Year 9', gender: 'Female' },
            { pupilId: '869', displayName: 'Sabine Wassef', yearGroup: 'Year 9', gender: 'Female' },
            { pupilId: '870', displayName: 'John Smith', yearGroup: 'Year 9', gender: 'Male' },
            { pupilId: '871', displayName: 'Emily Johnson', yearGroup: 'Year 9', gender: 'Female' },
            { pupilId: '872', displayName: 'Michael Brown', yearGroup: 'Year 9', gender: 'Male' },
            { pupilId: '873', displayName: 'Olivia Davis', yearGroup: 'Year 9', gender: 'Female' },
            { pupilId: '874', displayName: 'Daniel Wilson', yearGroup: 'Year 10', gender: 'Male' },
            { pupilId: '875', displayName: 'Sophia Martinez', yearGroup: 'Year 10', gender: 'Female' },
            { pupilId: '876', displayName: 'Alexander Anderson', yearGroup: 'Year 10', gender: 'Male' },
            { pupilId: '877', displayName: 'Isabella Thomas', yearGroup: 'Year 10', gender: 'Female' },
            { pupilId: '878', displayName: 'Matthew White', yearGroup: 'Year 11', gender: 'Male' },
            { pupilId: '879', displayName: 'Emma Harris', yearGroup: 'Year 11', gender: 'Female' },
            { pupilId: '880', displayName: 'James Lewis', yearGroup: 'Year 11', gender: 'Male' },
            { pupilId: '881', displayName: 'Lily Walker', yearGroup: 'Year 11', gender: 'Female' },
            { pupilId: '882', displayName: 'Benjamin Hall', yearGroup: 'Year 12', gender: 'Male' },
            { pupilId: '883', displayName: 'Chloe Young', yearGroup: 'Year 12', gender: 'Female' },
            { pupilId: '884', displayName: 'William King', yearGroup: 'Year 12', gender: 'Male' },
            { pupilId: '885', displayName: 'Ava Scott', yearGroup: 'Year 12', gender: 'Female' },
            { pupilId: '886', displayName: 'Ethan Green', yearGroup: 'Year 13', gender: 'Male' },
            { pupilId: '887', displayName: 'Mia Baker', yearGroup: 'Year 13', gender: 'Female' },
            { pupilId: '888', displayName: 'Lucas Adams', yearGroup: 'Year 13', gender: 'Male' },
            { pupilId: '889', displayName: 'Grace Nelson', yearGroup: 'Year 13', gender: 'Female' },
            { pupilId: '890', displayName: 'Henry Carter', yearGroup: 'Year 13', gender: 'Male' },
            { pupilId: '891', displayName: 'Zoe Mitchell', yearGroup: 'Year 8', gender: 'Female' },
            { pupilId: '892', displayName: 'Jack Roberts', yearGroup: 'Year 8', gender: 'Male' },
            { pupilId: '893', displayName: 'Ella Perez', yearGroup: 'Year 8', gender: 'Female' },
            { pupilId: '894', displayName: 'Owen Turner', yearGroup: 'Year 8', gender: 'Male' },
            { pupilId: '895', displayName: 'Liam Phillips', yearGroup: 'Year 7', gender: 'Male' },
            { pupilId: '896', displayName: 'Charlotte Campbell', yearGroup: 'Year 7', gender: 'Female' },
            { pupilId: '897', displayName: 'Noah Parker', yearGroup: 'Year 7', gender: 'Male' },
            { pupilId: '898', displayName: 'Amelia Evans', yearGroup: 'Year 7', gender: 'Female' },
            { pupilId: '899', displayName: 'Mason Edwards', yearGroup: 'Year 6', gender: 'Male' },
            { pupilId: '900', displayName: 'Harper Collins', yearGroup: 'Year 6', gender: 'Female' }
        ]);
    }
}
