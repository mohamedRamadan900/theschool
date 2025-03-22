import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../layout/card/card.component';
import { TableColumn, TableData } from './table.interface';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {
    title = input('');
    tableData = input.required<TableData>();
    sortDirection: 'asc' | 'desc' = 'asc';
    sortColumn: string | null = null;

    renderedTableData = signal(null);

    ngOnInit(): void {
        const tableData = this.tableData();
        this.renderedTableData.set(tableData);
    }

    onSort(column: TableColumn) {
        if (!column.sortable) return;

        if (this.sortColumn === column.key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column.key;
            this.sortDirection = 'asc';
        }

        const data = [...this.tableData().rows];
        data.sort((a, b) => {
            const modifier = this.sortDirection === 'asc' ? 1 : -1;
            return a[column.key] > b[column.key] ? modifier : -modifier;
        });

        this.renderedTableData.update((current) => ({
            ...current,
            rows: data
        }));
    }
}
