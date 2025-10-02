import { Routes } from '@angular/router';
import { AdmissionsComponent } from './components/admissions/admissions.component';
import { BehaviourComponent } from './components/behaviour/behaviour.component';
import { BespokeActivitiesComponent } from './components/bespoke-activities/bespoke-activities.component';
import { GovernanceComponent } from './components/governance/governance.component';
import { PAComponent } from './components/pa/pa.component';
import { StaffComponent } from './components/staff/staff.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TutorAttendanceComponent } from './components/tutor-attendance/tutor-attendance.component';
import { YearAttendanceComponent } from './components/year-attendance/year-attendance.component';

export const dashboardRoutes: Routes = [
    { path: '', redirectTo: 'summary', pathMatch: 'full' },
    { path: 'summary', component: SummaryComponent },
    { path: 'pa-sa-lates', component: PAComponent },
    { path: 'year-attendance', component: YearAttendanceComponent },
    { path: 'tutor-attendance', component: TutorAttendanceComponent },
    { path: 'behaviour', component: BehaviourComponent },
    { path: 'student-profile', component: StudentProfileComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'admissions', component: AdmissionsComponent },
    { path: 'governance', component: GovernanceComponent },
    { path: 'bespoke-activities', component: BespokeActivitiesComponent }
];
