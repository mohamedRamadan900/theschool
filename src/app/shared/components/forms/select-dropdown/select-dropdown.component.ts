import { Component, input, Output, EventEmitter, signal, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { IFormResetFilter } from '../interfaces/ResetFilterInterface';

interface Option {
    value: any;
    label: string;
}

@Component({
    selector: 'app-select-dropdown',
    standalone: true,
    imports: [CommonModule, FormsModule, DropdownModule, MultiSelectModule],
    templateUrl: './select-dropdown.component.html',
    styleUrl: './select-dropdown.component.scss'
})
export class SelectDropdownComponent implements IFormResetFilter {
    label = input<string>('Filter Options');
    options = input<Option[]>([]);
    allOption: Option = { value: 'All_Options_SelectDropdownComponent', label: 'All' };
    optionsWithAll = signal<Option[]>([]);
    placeholder = input<string>('Select options');
    isMultiple = input<boolean>(false);
    @Output() selectionChange = new EventEmitter<any[]>();

    selectedValues = signal<any[]>([]);
    private isAllOptionsChecked: boolean = false;

    onSelectionChange(event: MultiSelectChangeEvent): void {
        let updatedSelection: Option[] = event.value;

        if (this.isMultiple()) {
            updatedSelection = this.handleMultipleSelection(updatedSelection, event.itemValue);
            this.selectedValues.set(updatedSelection);
        } else {
            this.selectedValues.set(updatedSelection);
        }

        const emitValue = this.isMultiple() ? this.selectedValues() : [this.selectedValues()];
        this.selectionChange.emit(emitValue);
    }

    ngOnInit() {
        this.optionsWithAll.set([this.allOption, ...this.options()]);
        this.selectedValues.set([]);
    }

    private handleMultipleSelection(selectedValues: Option[], clickedItem: Option): Option[] {
        if (this.isAllOptionSelected(clickedItem)) {
            this.isAllOptionsChecked = !this.isAllOptionsChecked;
            return this.isAllOptionsChecked ? this.optionsWithAll() : [];
        }

        this.isAllOptionsChecked = false;
        return selectedValues.filter((option) => option.value !== this.allOption.value);
    }

    private isAllOptionSelected(option: Option): boolean {
        return option.value === this.allOption.value;
    }

    public resetFilters(): void {
        console.log('RESET');
        this.selectedValues.set([]);
        this.isAllOptionsChecked = false;
        this.selectionChange.emit([]);
    }
}
