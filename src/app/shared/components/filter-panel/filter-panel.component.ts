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
    yearGroupOptions: Option[] = [
        { value: '7', label: 'Year 7' },
        { value: '8', label: 'Year 8' },
        { value: '9', label: 'Year 9' },
        { value: '10', label: 'Year 10' }
    ];

    tutorGroupOptions: Option[] = [
        { value: '7A', label: '7A' },
        { value: '7B', label: '7B' },
        { value: '8A', label: '8A' },
        { value: '8B', label: '8B' }
    ];

    genderOptions: Option[] = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ];
    fsmOptions: Option[] = [{ label: 'False', value: 'false' }];
    ealOptions: Option[] = [{ label: 'False', value: 'fsalse' }];
    boarderOptions: Option[] = [
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: 'B', value: 'B' },
        { label: 'N', value: 'N' }
    ];
    senOptions: Option[] = [{ label: 'N', value: 'zN' }];
    rollOptions: Option[] = [{ label: 'Roll', value: 'Roll' }];

    studentOptions: Option[] = [
        { value: '1', label: 'John Doe' },
        { value: '2', label: 'Jane Smith' },
        { value: '3', label: 'Mike Johnson' },
        { value: '4', label: 'Sarah Wilson' }
    ];

    onSelectionChange(selected): void {
        console.log(selected);
    }

    resetFilters(): void {
        this.selectedYearGroup = null;
        this.selectedTutorGroups = null;
        this.selectedGenders = null;
        this.selectedFsm = null;
        this.selectedEal = null;
        this.selectedBoarder = null;
        this.selectedSen = null;
        this.selectedRoll = null;
        this.selectedStudents = null;
    }

    constructor() {
        effect(() => {
            // console.log(this.selectedGenders)
        });
    }

    selectedGenders: string[] = [];
    selectedTutorGroups: string[] = [];
    selectedStudents: string[] = [];
    selectedYearGroup: string | null = null;
    selectedFsm: string[] = [];
    selectedEal: string[] = [];
    selectedBoarder: string[] = [];
    selectedSen: string[] = [];
    selectedRoll: string[] = [];
}
