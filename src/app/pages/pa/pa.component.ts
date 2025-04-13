import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { AppNavbar } from "../../layout/component/app.navbar";

@Component({
    selector: 'app-pa',
    standalone: true,
    imports: [CommonModule, FilterPanelComponent, AppNavbar],
    templateUrl: './pa.component.html'
})
export class PAComponent {}
