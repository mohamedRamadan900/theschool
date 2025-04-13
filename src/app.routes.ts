import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { SummaryComponent } from './app/pages/summary/summary.component';
import { PAComponent } from './app/pages/pa/pa.component';
import { YearAttendanceComponent } from './app/pages/year-attendance/year-attendance.component';
import { TutorAttendanceComponent } from './app/pages/tutor-attendance/tutor-attendance.component';
import { BehaviourComponent } from './app/pages/behaviour/behaviour.component';
import { StudentProfileComponent } from './app/pages/student-profile/student-profile.component';
import { StaffComponent } from './app/pages/staff/staff.component';
import { AdmissionsComponent } from './app/pages/admissions/admissions.component';
import { GovernanceComponent } from './app/pages/governance/governance.component';
import { BespokeActivitiesComponent } from './app/pages/bespoke-activities/bespoke-activities.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
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
        ]
    },
    { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },

    { path: '**', redirectTo: '/notfound' }
];
