export interface StackedBarChartConfig {
    title: string;
    categories: string[];
    datasetId: string;
    datasets: BarChartDataset[];
    direction?: 'horizontal' | 'vertical';
    aspectRatio?: number;
    hideDataLabels?: boolean;
    showTotals?: boolean;
    isDataPercentage?: boolean;
    showLegend?: boolean;
    readOnly?: boolean;
}
export interface BarChartDataset {
    label: string;
    data: number[];
    color: string;
}

export interface IStackedBarChartFilter {
    filterType: 'reset' | 'category' | 'series' | 'dataPoint';
    data?: IStackedBarChartFilterCategory | IStackedBarChartFilterSeries | IStackedBarChartFilterDataPoint;
}
export interface IStackedBarChartFilterCategory {
    categoryId: string;
    categoryLabel: string | number;
    categoryIndex: number;
}
export interface IStackedBarChartFilterSeries {
    datasetId: string;
    datasetLabel: string;
    datasetIndex: number;
}
export interface IStackedBarChartFilterDataPoint {
    datasetId: string;
    datasetLabel: string;
    categoryId: string;
}
