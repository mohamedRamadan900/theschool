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
    familyNumber: string;
    surname: string;
    forename: string;
    middlename: string;
    displayName: string;
    preferredForename: string;
    preferredSurname: string;
    genderCode: string;
    gender: string;
    dob: string; // ISO string
    formName: string;
    yearGroupCode: string;
    yearGroup: string;
    registrationGroupCode: string;
    registrationGroup: string;
    registrationGroupText: string;
    houseCode: string;
    house: string;
    ncYearGroupCode: string;
    ncYearGroup: string;
    address: string;
    postCode: string;
    upn: string;
    studentEmailAddress: string;
    isInCare: boolean;
    inCareNotes: string;
    isForcesFamily: boolean;
    fsm: boolean;
    freeMealReviewDate: string;
    freeMealStartDate: string;
    fsmNotes: string;
    dateOfEntry: string;
    dateOfLeaving: string;
    firstLanguageCode: string;
    firstLanguage: string;
    isEnglishSecondLanguage: boolean;
    otherLanguageCode: string;
    otherLanguage: string;
    boarderStatusCode: string;
    boarderStatus: string;
    countryAddressCode: string;
    countryAddress: string;
    entryYear: string;
    enquirySource: string;
    entryYearGroup: string;
    anyRecordLastUpdated: string;
    isPhotoAllowed: boolean;
    photo: string | null;
    lastUpdated: string;
    placingAuthorityCode: string;
    placingAuthority: string | null;
    leavingReasonCode: string;
    leavingReason: string | null;
    leavingDestinationCode: string;
    leavingDestination: string | null;
    leavingDestinationPostYear11Code: string;
    leavingDestinationPostYear11: string | null;
    leavingDestinationPostYear13Code: string;
    leavingDestinationPostYear13: string | null;
    classTypeCode: string;
    classType: string | null;
    isExternal: boolean;
    forcesFamily: boolean;
    photoAllowed: boolean;
    englishSecondLanguage: boolean;
    inCare: boolean;
    external: boolean;
}

export type IStudentGender = 'Male' | 'Female';
