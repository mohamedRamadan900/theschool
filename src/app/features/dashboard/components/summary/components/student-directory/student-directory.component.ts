import { Component, computed, inject, signal } from '@angular/core';
import { TableComponent } from '../../../../../../shared/components/charts/table/table.component';
import { SchoolDataAPIService } from '../../../../services/school-data.service';
import { Router } from '@angular/router';
import { SummaryService } from '../../services/summary.service';

@Component({
    selector: 'app-student-directory',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './student-directory.component.html',
    styleUrl: './student-directory.component.scss'
})
export class StudentDirectoryComponent {
    summaryService = inject(SummaryService);
    router = inject(Router);

    studentDirectoryTable = computed<IStudentDirectoryTable>(() => {
        let data = this.summaryService.filteredStudentDirectory();
        if (!data || data.length === 0) {
            data = [];
        }
        const rows = data.map((el, index) => ({
            id: Number(el.pupilId) || index + 1,
            fullName: el.displayName
        }));
        return {
            columns: [
                { key: 'id', label: 'ID', sortable: true },
                { key: 'fullName', label: 'Full Name', sortable: true }
            ],
            rows: rows
        };
    });

    ngOnInit(): void {
        this.summaryService.fetchStudentDirectory().subscribe((data) => {
            // this.studentDirectoryTable.set({
            //     ...this.studentDirectoryTable(),
            //     rows
            // });
        });
    }

    onTableSelection(selected: any): void {
        this.router.navigate(['student', selected.id]);
    }

    onTableSelectionReset(selected: any): void {
        console.log('Reset:', selected);
    }
}

export interface IStudentDirectoryTable {
    columns: {
        key: string;
        label: string;
        sortable?: boolean;
    }[];
    rows: {
        id: number;
        fullName: string;
    }[];
}
