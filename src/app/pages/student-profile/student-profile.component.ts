import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { AppNavbar } from "../../layout/component/app.navbar";

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, AppNavbar],
  templateUrl: './student-profile.component.html'
})
export class StudentProfileComponent {}
