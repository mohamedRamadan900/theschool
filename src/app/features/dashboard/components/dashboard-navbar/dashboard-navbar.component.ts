import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-dashboard-navbar',
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.scss'
})
export class DashboardNavbarComponent {
  navItems: NavItem[] = [
    { label: 'Summary', route: '/dashboard/summary' },
    { label: 'PA/SA & Lates', route: '/dashboard/pa-sa-lates' },
    { label: 'Year Attendance', route: '/dashboard/year-attendance' },
    { label: 'Tutor Attendance', route: '/dashboard/tutor-attendance' },
    { label: 'Behaviour', route: '/dashboard/behaviour' },
    { label: 'Student Profile', route: '/dashboard/student-profile' },
    { label: 'Staff', route: '/dashboard/staff' },
    { label: 'Admissions', route: '/dashboard/admissions' },
    { label: 'Governance', route: '/dashboard/governance' },
    { label: 'Bespoke Activities', route: '/dashboard/bespoke-activities' }
];
}
