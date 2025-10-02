import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../../../shared/components/filter-panel/filter-panel.component';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-bespoke-activities',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, DashboardNavbarComponent],
  templateUrl: './bespoke-activities.component.html'
})
export class BespokeActivitiesComponent {}
