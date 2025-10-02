import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { FilterPanelComponent } from '../../../../shared/components/filter-panel/filter-panel.component';

@Component({
  selector: 'app-tutor-attendance',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, DashboardNavbarComponent],
  templateUrl: './tutor-attendance.component.html'
})
export class TutorAttendanceComponent {}
