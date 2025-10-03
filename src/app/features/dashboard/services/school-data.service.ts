import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Student, YearGroupStats, YearGroupAttendance, SexStats, AttendanceStats, IStudentGender } from '../models/dashboard.interface';

@Injectable({
    providedIn: 'root'
})
export class SchoolDataAPIService {
    private baseUrl = 'http://localhost:8080/api/v1/engage';

    constructor(private http: HttpClient) {}

    getStudentsYearGroup(): Observable<YearGroupStats> {
        return this.http.get<YearGroupStats>(`${this.baseUrl}/students-year-group`);
    }

    getStudentsAttendanceYearGroup(): Observable<YearGroupAttendance> {
        return this.http.get<YearGroupAttendance>(`${this.baseUrl}/students-attendance-year-group`);
    }

    getSexStats(): Observable<SexStats> {
        return this.http.get<SexStats>(`${this.baseUrl}/sex`);
    }

    getAttendance(): Observable<AttendanceStats> {
        return this.http.get<AttendanceStats>(`${this.baseUrl}/attendance`);
    }

    getStudentsDirectory(yearGroupCode?: string): Observable<IStudentDirectory[]> {
        const url = yearGroupCode ? `${this.baseUrl}/students?yearGroupCode=${yearGroupCode}` : `${this.baseUrl}/students`;

        return this.http.get<Student[]>(url).pipe(
            map((data) =>
                data.map((student) => ({
                    pupilId: student.pupilId,
                    displayName: student.displayName,
                    yearGroup: student.yearGroup,
                    gender: student.gender as IStudentGender
                }))
            )
        );
    }
}
export interface IStudentDirectory {
    pupilId: string;
    displayName: string;
    yearGroup: string;
    gender: IStudentGender;
}
