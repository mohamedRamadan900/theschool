import { Component, computed, effect, input, output, signal } from '@angular/core';
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
    tableDataState = signal<TableData | null>(null);
    selectedRows = signal<any[]>([]);
    onSelection = output<any>();
    onSelectionReset = output<void>();

    constructor() {
        effect(() => {
            const data = this.tableData();
            if (!data) return;

            this.tableDataState.set({
                ...data,
                rows: data.rows.map((row) => ({
                    ...row,
                    _classes: Object.fromEntries(data.columns.map((column) => [column.key, this.calculatePercentageClass(row[column.key], column)]))
                }))
            });
        });
    }

    private calculatePercentageClass(value: number, column: TableColumn): string {
        if (!column.showPercent) return '';

        if (value >= 85) return 'percent-high';
        if (value >= 65) return 'percent-medium';
        if (value >= 50) return 'percent-low';
        return 'percent-very-low';
    }

    onSort(column: TableColumn) {
        if (!column.sortable) return;

        if (this.sortColumn === column.key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column.key;
            this.sortDirection = 'asc';
        }

        const currentData = this.tableDataState();
        if (!currentData) return;

        const sortedData = {
            ...currentData,
            rows: [...currentData.rows].sort((a, b) => {
                const modifier = this.sortDirection === 'asc' ? 1 : -1;
                return a[column.key] > b[column.key] ? modifier : -modifier;
            })
        };

        this.tableDataState.set(sortedData);
    }

    onSelectRow(row: any): void {
        if (this.selectedRows().length === 1 && this.selectedRows()[0] === row) {
            // Clicking the same row again - deselect it
            this.selectedRows.set([]);
            // console.log('No row selected');
            this.onSelectionReset.emit();
        } else {
            // Select new row
            this.selectedRows.set([row]);
            // console.log('Selected row:', row);
            this.onSelection.emit(row);
        }
    }

    isRowSelected(row: any): boolean {
        return this.selectedRows().includes(row);
    }
}
