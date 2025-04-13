import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

interface NavItem {
    label: string;
    route: string;
}

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule],
    template: `
        <div class="flex flex-wrap gap-4 mb-12">
            @for (item of navItems; track $index) {
                <button  
                    [routerLink]="item.route" 
                    routerLinkActive="bg-primary text-white"
                    [routerLinkActiveOptions]="{exact: true}"
                    class="text-primary border-primary border-2 py-3 px-4 rounded flex-grow text-2xl hover:bg-primary hover:text-white transition-all">
                    {{ item.label }}
                </button>
            }
        </div>
    `
})
export class AppNavbar {
    navItems: NavItem[] = [
        { label: 'Summary', route: '/summary' },
        { label: 'PA/SA & Lates', route: '/pa-sa-lates' },
        { label: 'Year Attendance', route: '/year-attendance' },
        { label: 'Tutor Attendance', route: '/tutor-attendance' },
        { label: 'Behaviour', route: '/behaviour' },
        { label: 'Student Profile', route: '/student-profile' },
        { label: 'Staff', route: '/staff' },
        { label: 'Admissions', route: '/admissions' },
        { label: 'Governance', route: '/governance' },
        { label: 'Bespoke Activities', route: '/bespoke-activities' }
    ];
}
