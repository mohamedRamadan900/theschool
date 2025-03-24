import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { Option } from '../../../interfaces/Option';

@Component({
    selector: 'app-select-dropdown',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule, MultiSelectModule],
    templateUrl: './select-dropdown.component.html',
    styleUrl: './select-dropdown.component.scss'
})
export class SelectDropdownComponent {
    label = input<string>('Filter Options');
    options = input<Option[]>([]);
    placeholder = input<string>('Select options');
    isMultiple = input<boolean>(false);
    value = model<string[] | string>([]);

    onSelectionChange(event: MultiSelectChangeEvent): void {
        if (this.isMultiple()) {
            this.value.set(event.value);
        } else {
            this.value.set(event.value ?? '');
        }
    }
}
