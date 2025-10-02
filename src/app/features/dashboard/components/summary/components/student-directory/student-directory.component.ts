import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../../../shared/components/charts/table/table.component';
import { SchoolDataAPIService } from '../../../../services/school-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-student-directory',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './student-directory.component.html',
    styleUrl: './student-directory.component.scss'
})
export class StudentDirectoryComponent {
    schoolDataService = inject(SchoolDataAPIService);
    router = inject(Router);

    studentDirectoryTable: IStudentDirectoryTable = {
        columns: [
            { key: 'id', label: 'ID', sortable: true },
            { key: 'fullName', label: 'Full Name', sortable: true }
        ],
        rows: []
    };

    ngOnInit(): void {
        this.fetchStudentDirectory();
    }

    fetchStudentDirectory(): void {
        this.schoolDataService.getStudentsDirectory().subscribe((data) => {
            if (!data || data.length === 0) return;

            const rows = data.map((el, index) => ({
                id: Number(el.pupilId) || index + 1,
                fullName: el.displayName
            }));

            this.studentDirectoryTable.rows = rows;
        });
    }

    onTableSelection(selected: any): void {
        this.router.navigate(['student', selected.id]);
    }

    onTableSelectionReset(selected: any): void {
        console.log('Reset:', selected);
    }
}

interface IStudentDirectoryTable {
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
