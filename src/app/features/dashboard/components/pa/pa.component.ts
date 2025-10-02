import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { FilterPanelComponent } from '../../../../shared/components/filter-panel/filter-panel.component';

@Component({
    selector: 'app-pa',
    standalone: true,
    imports: [CommonModule, FilterPanelComponent, DashboardNavbarComponent],
    templateUrl: './pa.component.html'
})
export class PAComponent {}
