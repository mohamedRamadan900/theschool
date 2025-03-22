export interface PieChartConfig {
    datasetId: string;
    title?: string;
    data: number[];
    labels: string[];
    colors?: string[];
    hideDataLables?: boolean;
    aspectRatio?: number;
}
export interface PieChartDataItem {
    label: string;
    value: number;
    color?: string;
}
