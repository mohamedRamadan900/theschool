import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, YearGroupStats, YearGroupAttendance, SexStats, AttendanceStats } from '../models/dashboard.interface';

@Injectable({
    providedIn: 'root'
})
export class SchoolDataService {
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

    getStudentsByYearGroupCode(yearGroupCode: string): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.baseUrl}/students?yearGroupCode=${yearGroupCode}`);
    }
}
