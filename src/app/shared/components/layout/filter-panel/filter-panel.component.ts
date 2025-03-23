import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { SelectDropdownComponent } from '../../forms/select-dropdown/select-dropdown.component';

@Component({
    selector: 'app-filter-panel',
    imports: [CardComponent, SelectDropdownComponent],
    templateUrl: './filter-panel.component.html',
    styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent {
    options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
    ];

    onSelectionChange(selected): void {
        console.log(selected);
    }

    @ViewChildren('resetFilters') resetFilters!: QueryList<any>;

    resetDropdown(): void {
        this.resetFilters.forEach(compoennt => compoennt.reset());
    }
}
