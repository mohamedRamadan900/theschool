// src/app/shared/models/school-data.models.ts

export interface YearGroupStats {
    [yearGroup: string]: {
        Male?: number;
        Female?: number;
    };
}

export interface YearGroupAttendance {
    [yearGroupCode: string]: number;
}

export interface SexStats {
    Male: number;
    Female: number;
}

export interface AttendanceStats {
    ABSENT: number;
    PARTIAL: number;
    FULL: number;
}

export interface Student {
    schoolId: string;
    status: string;
    pupilId: string;
    admissionNumber: number;
    pupilCode: string;
    surname: string;
    forename: string;
    displayName: string;
    gender: string;
    dob: string; // or Date if you plan to parse it
    yearGroupCode: string;
    yearGroup: string;
    house: string;
    address: string;
    studentEmailAddress: string;
}
