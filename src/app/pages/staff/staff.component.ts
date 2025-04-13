import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { AppNavbar } from "../../layout/component/app.navbar";

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, AppNavbar],
  templateUrl: './staff.component.html'
})
export class StaffComponent {}
