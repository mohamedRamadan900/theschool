import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { AppNavbar } from "../../layout/component/app.navbar";

@Component({
  selector: 'app-year-attendance',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, AppNavbar],
  templateUrl: './year-attendance.component.html'
})
export class YearAttendanceComponent {}
