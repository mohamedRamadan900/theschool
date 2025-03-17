export interface IStackedBarChartFilter {
    filterType: 'reset' | 'category' | 'series' | 'dataPoint';
    data?: {
        // For category filtering
        categoryLabel?: string | number;
        categoryIndex?: number;

        // For series filtering
        seriesLabel?: string;
        seriesIndex?: number;

        // For specific data point filtering
        dataPointValue?: number;
    };
}
