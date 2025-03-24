import { Component, effect, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CardComponent } from '../layout/card/card.component';
import { SelectDropdownComponent } from '../forms/select-dropdown/select-dropdown.component';
import { IFormResetFilter } from '../forms/interfaces/ResetFilterInterface';
import { ButtonToggleGroupComponent } from '../forms/button-toggle-group/button-toggle-group.component';
import { Option } from '../../interfaces/Option';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-filter-panel',
    imports: [CardComponent, SelectDropdownComponent, ButtonToggleGroupComponent, JsonPipe],
    templateUrl: './filter-panel.component.html',
    styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent {
    options: Option[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' }
    ];

    onSelectionChange(selected): void {
        console.log(selected);
    }

    @ViewChildren('resetFilters') resetFilters!: QueryList<IFormResetFilter>;

    resetDropdown(): void {
        this.resetFilters.forEach((compoennt) => compoennt.resetFilters());
    }

    constructor() {
        effect(() => {
            // console.log(this.testValues)
        });
    }

    testValues: Option[] = [this.options[0].value];
    testValues2: any[] = [this.options[0].value];

    testValue: any=this.options[0].value;
}
