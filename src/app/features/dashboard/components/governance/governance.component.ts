import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../../../shared/components/filter-panel/filter-panel.component';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-governance',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, DashboardNavbarComponent],
  templateUrl: './governance.component.html'
})
export class GovernanceComponent {}
