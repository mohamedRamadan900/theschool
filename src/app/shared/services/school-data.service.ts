import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SchoolDataService {
    private baseUrl = 'http://localhost:8080/api/v1/engage';

    constructor(private http: HttpClient) {
        alert("SchoolDataService");
    }

    getStudentsYearGroup(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/students-year-group`);
    }

    getStudentsAttendanceYearGroup(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/students-attendance-year-group`);
    }

    getSexStats(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/sex`);
    }

    getAttendance(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/attendance`);
    }

    getStudentsByYearGroupCode(yearGroupCode: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/students?yearGroupCode=${yearGroupCode}`);
    }
}
