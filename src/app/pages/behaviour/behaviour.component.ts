import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { AppNavbar } from "../../layout/component/app.navbar";

@Component({
  selector: 'app-behaviour',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, AppNavbar],
  templateUrl: './behaviour.component.html'
})
export class BehaviourComponent {}
