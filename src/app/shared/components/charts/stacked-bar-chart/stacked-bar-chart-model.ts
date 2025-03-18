export interface StackedBarChartConfig {
    title: string;
    categories: string[];
    datasetKey: string;
    datasets: BarChartDataset[];
    direction?: 'horizontal' | 'vertical';
    aspectRatio?: number;
    hideDataLabels?: boolean;
    showTotals?: boolean;
    isDataPercentage?: boolean;
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
    seriesId: string;
    seriesLabel: string;
    seriesIndex: number;
}
export interface IStackedBarChartFilterDataPoint {
    dataPointIndex: number;
    dataPointValue: number;
}
