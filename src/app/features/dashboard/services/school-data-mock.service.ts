import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { YearGroupStats, YearGroupAttendance, SexStats, AttendanceStats, Student } from '../models/dashboard.interface';
import { IStudentDirectory } from './school-data.service';

@Injectable({
    providedIn: 'root'
})
export class SchoolDataMockService {
    getStudentsYearGroup(): Observable<YearGroupStats> {
        return of({
            Reception: { Female: 2, Male: 2 },
            Nursery: { Female: 2, Male: 2 },
            'Groep 1': { Male: 1, Female: 1 },
            'Groep 2': { Male: 1, Female: 1 },
            'Groep 3': { Male: 1, Female: 1 },
            'Groep 4': { Male: 1, Female: 1 },
            'Groep 5': { Male: 1, Female: 1 },
            'Groep 6': { Male: 1, Female: 1 },
            'Groep 7': { Male: 2, Female: 2 },
            'Groep 8': { Male: 2, Female: 2 },
            'Year 1': { Male: 2, Female: 2 },
            'Year 2': { Male: 2, Female: 2 },
            'Year 3': { Male: 2, Female: 2 },
            'Year 4': { Male: 2, Female: 2 },
            'Year 5': { Male: 2, Female: 2 },
            'Year 6': { Male: 2, Female: 2 },
            'Year 7': { Male: 3, Female: 1 },
            'Year 8': { Male: 2, Female: 2 },
            'Year 9': { Male: 1, Female: 2 },
            test: { Male: 2, Female: 1 },
            'Year 10': { Male: 1, Female: 2 }
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

    getStudentsDirectory(yearGroupCode?: string): Observable<IStudentDirectory[]> {
        return of([
            // Original 33 students
            { pupilId: '868', displayName: 'Sarah Tadros', yearGroup: 'Reception', gender: 'Female' },
            { pupilId: '869', displayName: 'Sabine Wassef', yearGroup: 'Reception', gender: 'Male' },
            { pupilId: '870', displayName: 'John Smith', yearGroup: 'Nursery', gender: 'Male' },
            { pupilId: '871', displayName: 'Emily Johnson', yearGroup: 'Nursery', gender: 'Female' },
            { pupilId: '872', displayName: 'Michael Brown', yearGroup: 'Groep 1', gender: 'Male' },
            { pupilId: '873', displayName: 'Olivia Davis', yearGroup: 'Groep 2', gender: 'Female' },
            { pupilId: '874', displayName: 'Daniel Wilson', yearGroup: 'Groep 3', gender: 'Male' },
            { pupilId: '875', displayName: 'Sophia Martinez', yearGroup: 'Groep 4', gender: 'Female' },
            { pupilId: '876', displayName: 'Alexander Anderson', yearGroup: 'Groep 5', gender: 'Male' },
            { pupilId: '877', displayName: 'Isabella Thomas', yearGroup: 'Groep 6', gender: 'Female' },
            { pupilId: '878', displayName: 'Matthew White', yearGroup: 'Groep 7', gender: 'Male' },
            { pupilId: '879', displayName: 'Emma Harris', yearGroup: 'Groep 7', gender: 'Female' },
            { pupilId: '880', displayName: 'James Lewis', yearGroup: 'Groep 8', gender: 'Male' },
            { pupilId: '881', displayName: 'Lily Walker', yearGroup: 'Groep 8', gender: 'Female' },
            { pupilId: '882', displayName: 'Benjamin Hall', yearGroup: 'Year 1', gender: 'Male' },
            { pupilId: '883', displayName: 'Chloe Young', yearGroup: 'Year 1', gender: 'Female' },
            { pupilId: '884', displayName: 'William King', yearGroup: 'Year 2', gender: 'Male' },
            { pupilId: '885', displayName: 'Ava Scott', yearGroup: 'Year 2', gender: 'Female' },
            { pupilId: '886', displayName: 'Ethan Green', yearGroup: 'Year 3', gender: 'Male' },
            { pupilId: '887', displayName: 'Mia Baker', yearGroup: 'Year 3', gender: 'Female' },
            { pupilId: '888', displayName: 'Lucas Adams', yearGroup: 'Year 4', gender: 'Male' },
            { pupilId: '889', displayName: 'Grace Nelson', yearGroup: 'Year 4', gender: 'Female' },
            { pupilId: '890', displayName: 'Henry Carter', yearGroup: 'Year 5', gender: 'Male' },
            { pupilId: '891', displayName: 'Zoe Mitchell', yearGroup: 'Year 5', gender: 'Female' },
            { pupilId: '892', displayName: 'Jack Roberts', yearGroup: 'Year 6', gender: 'Male' },
            { pupilId: '893', displayName: 'Ella Perez', yearGroup: 'Year 6', gender: 'Female' },
            { pupilId: '894', displayName: 'Owen Turner', yearGroup: 'Year 7', gender: 'Male' },
            { pupilId: '895', displayName: 'Liam Phillips', yearGroup: 'Year 7', gender: 'Male' },
            { pupilId: '896', displayName: 'Charlotte Campbell', yearGroup: 'Year 8', gender: 'Female' },
            { pupilId: '897', displayName: 'Noah Parker', yearGroup: 'Year 8', gender: 'Male' },
            { pupilId: '898', displayName: 'Amelia Evans', yearGroup: 'Year 9', gender: 'Female' },
            { pupilId: '899', displayName: 'Mason Edwards', yearGroup: 'test', gender: 'Male' },
            { pupilId: '900', displayName: 'Harper Collins', yearGroup: 'Year 10', gender: 'Female' },

            // Duplicated / new students
            { pupilId: '901', displayName: 'Ella Bennett', yearGroup: 'Reception', gender: 'Female' },
            { pupilId: '902', displayName: 'Lucas Hughes', yearGroup: 'Reception', gender: 'Male' },
            { pupilId: '903', displayName: 'Mia Wood', yearGroup: 'Nursery', gender: 'Female' },
            { pupilId: '904', displayName: 'Liam Perry', yearGroup: 'Nursery', gender: 'Male' },
            { pupilId: '905', displayName: 'Charlotte Fisher', yearGroup: 'Groep 1', gender: 'Female' },
            { pupilId: '906', displayName: 'James Ward', yearGroup: 'Groep 2', gender: 'Male' },
            { pupilId: '907', displayName: 'Amelia Hughes', yearGroup: 'Groep 3', gender: 'Female' },
            { pupilId: '908', displayName: 'Henry Ross', yearGroup: 'Groep 4', gender: 'Male' },
            { pupilId: '909', displayName: 'Olivia Bell', yearGroup: 'Groep 5', gender: 'Female' },
            { pupilId: '910', displayName: 'Ethan Morgan', yearGroup: 'Groep 6', gender: 'Male' },
            { pupilId: '911', displayName: 'Sophia Reed', yearGroup: 'Groep 7', gender: 'Female' },
            { pupilId: '912', displayName: 'Alexander Cook', yearGroup: 'Groep 7', gender: 'Male' },
            { pupilId: '913', displayName: 'Isabella Bailey', yearGroup: 'Groep 8', gender: 'Female' },
            { pupilId: '914', displayName: 'William Bell', yearGroup: 'Groep 8', gender: 'Male' },
            { pupilId: '915', displayName: 'Mason Cox', yearGroup: 'Year 1', gender: 'Male' },
            { pupilId: '916', displayName: 'Emma Ward', yearGroup: 'Year 1', gender: 'Female' },
            { pupilId: '917', displayName: 'Noah Hughes', yearGroup: 'Year 2', gender: 'Male' },
            { pupilId: '918', displayName: 'Ava Perry', yearGroup: 'Year 2', gender: 'Female' },
            { pupilId: '919', displayName: 'Henry Ross', yearGroup: 'Year 3', gender: 'Male' },
            { pupilId: '920', displayName: 'Lily Reed', yearGroup: 'Year 3', gender: 'Female' },
            { pupilId: '921', displayName: 'James Bell', yearGroup: 'Year 4', gender: 'Male' },
            { pupilId: '922', displayName: 'Chloe Bailey', yearGroup: 'Year 4', gender: 'Female' },
            { pupilId: '923', displayName: 'Ethan Cook', yearGroup: 'Year 5', gender: 'Male' },
            { pupilId: '924', displayName: 'Mia Ward', yearGroup: 'Year 5', gender: 'Female' },
            { pupilId: '925', displayName: 'Liam Hughes', yearGroup: 'Year 6', gender: 'Male' },
            { pupilId: '926', displayName: 'Olivia Perry', yearGroup: 'Year 6', gender: 'Female' },
            { pupilId: '927', displayName: 'Lucas Cook', yearGroup: 'Year 7', gender: 'Male' },
            { pupilId: '928', displayName: 'Sophia Bell', yearGroup: 'Year 7', gender: 'Female' },
            { pupilId: '929', displayName: 'Mason Ward', yearGroup: 'Year 8', gender: 'Male' },
            { pupilId: '930', displayName: 'Amelia Cook', yearGroup: 'Year 8', gender: 'Female' },
            { pupilId: '931', displayName: 'James Hughes', yearGroup: 'Year 9', gender: 'Male' },
            { pupilId: '932', displayName: 'Charlotte Ward', yearGroup: 'Year 9', gender: 'Female' },
            { pupilId: '933', displayName: 'Lucas Bell', yearGroup: 'test', gender: 'Male' },
            { pupilId: '934', displayName: 'Emma Cook', yearGroup: 'test', gender: 'Female' },
            { pupilId: '935', displayName: 'Oliver Perry', yearGroup: 'Year 10', gender: 'Male' },
            { pupilId: '936', displayName: 'Lily Hughes', yearGroup: 'Year 10', gender: 'Female' }
        ]);
    }
}
