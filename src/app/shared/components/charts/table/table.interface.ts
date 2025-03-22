export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    formatter?: (value: any, row?: any) => string | number;
    cellClass?: string;
}

export interface TableData<T = any> {
    columns: TableColumn[];
    rows: T[];
}
