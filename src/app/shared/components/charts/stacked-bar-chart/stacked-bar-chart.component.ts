import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CardComponent } from '../../layout/card/card.component';
import { convertToRgba, convertToTransparent } from '../../../utils/colorHelper';
import { BarChartDataset, IStackedBarChartFilter, StackedBarChartConfig } from './stacked-bar-chart-model';
import { LegendComponent } from '../legend/legend/legend.component';

// Register the required Chart.js components
// Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// Interface for the entire chart configuration

@Component({
    selector: 'app-stacked-bar-chart',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, CardComponent, LegendComponent],
    templateUrl: './stacked-bar-chart.component.html',
    styleUrl: './stacked-bar-chart.component.scss',
    host: {
        onresize: 'onResize($event)'
    }
})
export class StackedBarChart implements OnInit, OnChanges {
    @Input() chartConfig: StackedBarChartConfig | null = null;
    onFilterChange = output<IStackedBarChartFilter>();
    // Computed properties for chart configuration
    get title(): string {
        return this.chartConfig?.title || '';
    }

    get categories(): string[] {
        return this.chartConfig?.categories || [];
    }
    get datasetId(): string {
        return this.chartConfig?.datasetId;
    }
    get datasets(): BarChartDataset[] {
        return this.chartConfig?.datasets || [];
    }

    get isHorizontal(): boolean {
        return this.chartConfig?.direction === 'horizontal';
    }
    get showCustomLegend(): boolean {
        return this.chartConfig?.showLegend ?? true;
    }

    legendData: { label: string; color: string }[] = [];

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
    @ViewChild('chartContainer') chartContainer?: ElementRef;

    public barChartType: ChartType = 'bar';
    private originalColors: string[] = [];

    // Track active element
    private selectedElement: {
        datasetIndex: number;
        index: number | null;
    } | null = null;

    private selectedCategory: string | null = null;

    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: []
    };

    categoryClickColors = {
        highlighted: '#000000', // Black
        initialColor: '#666666' // Gray;
    };

    plugins = [
        {
            id: 'clickableLabels',
            afterEvent: (chart, args) => {
                if (args.event.type === 'click') {
                    const { x, y } = args.event;

                    // Check if click is on Y-axis labels
                    if (x >= chart.scales.y.left && x <= chart.scales.y.right && y > chart.scales.y.top && y < chart.scales.y.bottom) {
                        // Get the index of the clicked label
                        const yValue = chart.scales.y.getValueForPixel(y);
                        const clickedIndex = chart.scales.y.ticks.findIndex((tick) => tick.value === yValue);

                        if (clickedIndex === -1) return; // No matching label found

                        const labelText = chart.scales.y.getLabelForValue(yValue);

                        if (this.selectedCategory === labelText) {
                            this.resetFilters();
                            chart.scales.y.options.ticks.color = this.categoryClickColors.initialColor;
                            return;
                        }

                        this.resetFilters();
                        this.selectedCategory = labelText;

                        // Highlight the clicked label
                        chart.scales.y.options.ticks.color = (context) => {
                            return context.tick.value === yValue ? this.categoryClickColors.highlighted : this.categoryClickColors.initialColor;
                        };

                        // Reduce opacity for all bars except those in the clicked category
                        chart.data.datasets.forEach((dataset, i) => {
                            if (Array.isArray(dataset.backgroundColor)) {
                                dataset.backgroundColor = dataset.backgroundColor.map((color, index) => {
                                    const baseColor = this.originalColors[i];
                                    return index === clickedIndex ? baseColor : convertToTransparent(baseColor);
                                });
                            }
                        });

                        this.updateChart();
                        this.onFilterChange.emit({
                            filterType: 'category',
                            data: {
                                categoryId: yValue,
                                categoryLabel: labelText,
                                categoryIndex: clickedIndex
                            }
                        });
                    }
                }
            }
        }
    ];

    private highlightYaxisTickColor(targetTickLabel?: string): void {
        // resetColors
        // Reset the actual chart instance's ticks color
        this.chart.chart.options.scales['y'].ticks.color = this.categoryClickColors.initialColor;
        // Also update your local options copy to maintain consistency
        this.barChartOptions.scales['y'].ticks.color = this.categoryClickColors.initialColor;

        // Highlight target tick
        if (targetTickLabel) {
            this.barChartOptions.scales['y'].ticks.color = (context) => {
                const label = context.tick.label;
                return label === targetTickLabel
                    ? this.categoryClickColors.highlighted // Highlight color for the target tick
                    : this.categoryClickColors.initialColor; // Normal color for other ticks
            };

            // Apply the updated options to the chart instance
            this.chart.chart.options.scales['y'].ticks.color = this.barChartOptions.scales['y'].ticks.color;

            // Update the chart to reflect changes
            this.chart.chart.update();
        }
    }

    public barChartOptions: ChartConfiguration['options'] = {
        indexAxis: 'y', // Default to horizontal bars
        responsive: true,
        // aspectRatio: 1,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: this.title,
                font: {
                    size: 16
                }
            },
            legend: {
                position: 'top',
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (context) => context[0]?.dataset.label,
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed.x || context.parsed.y;
                        return `${label}: ${value} ${this.chartConfig?.isDataPercentage ? '%' : ''}`; // Format the tooltip
                    }
                }
            },
            datalabels: {
                display: true,
                color: 'black',
                formatter: (value, context) => {
                    return `${value}${this.chartConfig?.isDataPercentage ? '%' : ''}`; // Format the data labels
                }
                // align: 'center',
                // anchor: 'end',
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                display: false
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    color: this.categoryClickColors.initialColor
                }
            }
        },

        onClick: (event, elements, chart) => {
            if (this.chartConfig.readOnly) return;
            debugger
            this.handleChartClick(event, elements, chart);
        }
    };

    constructor() {}

    ngOnInit(): void {
        this.initializeChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['chartConfig']) {
            this.initializeChart();
        }
    }

    private initializeChart(): void {
        if (!this.chartConfig) return;

        // Set horizontal or vertical mode
        if (this.barChartOptions) {
            this.barChartOptions.indexAxis = this.isHorizontal ? 'y' : 'x';
        }
        // Set Aspect Ratio
        if (this.chartConfig.aspectRatio) {
            this.barChartOptions.aspectRatio = this.chartConfig.aspectRatio;
        }
        // set Hide Data Labels
        this.barChartOptions.plugins.datalabels.display = !this.chartConfig.hideDataLabels;

        // Add totals plugin
        if (this.chartConfig?.showTotals) {
            this.addTotalsToChart();
        }

        // Update chart labels
        this.barChartData.labels = this.categories;

        // Map input datasets to chart datasets
        this.barChartData.datasets = this.datasets.map((dataset) => {
            return {
                data: dataset.data,
                label: dataset.label,
                backgroundColor: convertToRgba(dataset.color)
            };
        });

        // Store original colors for highlighting
        this.originalColors = this.datasets.map((dataset) => convertToRgba(dataset.color));

        // Initialize chart colors
        this.initializeChartColors();

        // Get legend data
        this.getLegendData();

        // Update title
        if (this.barChartOptions?.plugins?.title) {
            this.barChartOptions.plugins.title.text = this.title;
        }

        // Force chart update
        this.updateChart();
    }

    private getLegendData(): void {
        this.legendData = this.datasets.map((dataset) => {
            return {
                label: dataset.label,
                color: dataset.color
            };
        });
    }

    onResize(event: any) {
        this.updateChartSize();
    }

    /**
     * Updates the chart size based on container dimensions
     */
    private updateChartSize(): void {
        if (this.chart?.chart && this.chartContainer) {
            // Get container width
            const containerWidth = this.chartContainer.nativeElement.offsetWidth;

            // Adjust font sizes based on container width
            const baseFontSize = containerWidth < 500 ? 9 : containerWidth < 768 ? 11 : 12;

            // Update title font size
            if (this.chart.chart.options.plugins?.title) {
                this.chart.chart.options.plugins.title.font = {
                    size: baseFontSize + 4
                };
            }

            // Update the chart
            this.updateChart();
        }
    }

    /**
     * Initialize chart colors in a way that Chart.js can properly update
     */
    private initializeChartColors(): void {
        // Pre-create array-based backgroundColor for each dataset
        for (let i = 0; i < this.barChartData.datasets.length; i++) {
            // Create an array of the same color for each data point
            const colorArray = Array(this.barChartData.labels?.length).fill(this.originalColors[i]);
            this.barChartData.datasets[i].backgroundColor = colorArray;
        }
    }

    /**
     * Adds total values to the right of each bar
     */
    private addTotalsToChart(): void {
        const plugin = {
            id: 'totalLabels',
            afterDraw: (chart: any) => {
                const ctx = chart.ctx;
                ctx.font = '12px Arial';
                ctx.fillStyle = '#996633'; // Brown color for totals
                ctx.textAlign = 'left';

                // For each data point
                chart.data.labels.forEach((label: string, i: number) => {
                    // Calculate total for this label
                    let total = 0;
                    chart.data.datasets.forEach((dataset: any) => {
                        total += dataset.data[i] || 0;
                    });

                    if (total > 0) {
                        // Get position to place text
                        const meta = chart.getDatasetMeta(chart.data.datasets.length - 1);
                        if (meta.data[i]) {
                            // Position depends on horizontal or vertical orientation
                            let x, y;
                            if (this.isHorizontal) {
                                x = meta.data[i].x + 10; // 10px after the bar for horizontal
                                y = meta.data[i].y;
                            } else {
                                x = meta.data[i].x;
                                y = meta.data[i].y - 10; // 10px above the bar for vertical
                            }

                            // Draw text
                            if (this.isHorizontal) {
                                ctx.fillText(total.toString(), x, y + 4);
                            } else {
                                ctx.textAlign = 'center';
                                ctx.fillText(total.toString(), x, y);
                            }
                        }
                    }
                });
            }
        };

        // Add the plugin to Chart.js if not already registered
        const existingPlugin = Chart.registry.plugins.get('totalLabels');
        if (!existingPlugin) {
            // @ts-ignore
            Chart.register(plugin);
        }
    }

    /**
     * Handles click events on the chart
     */
    private handleChartClick(event: any, elements: any[], chart: any): void {
        if (elements.length === 0) {
            // If clicked outside a bar, reset all colors
            this.resetFilters();
            return;
        }
        // Get the dataset index and data index of the clicked bar
        const datasetIndex = elements[0].datasetIndex;
        const index = elements[0].index;

        // Extract information about the clicked bar
        const datasetId = this.datasetId; //Gender
        const datasetLabel = this.barChartData.datasets[datasetIndex].label; //  Female / Male
        const categoryId = this.barChartData.labels?.[index] as string; // Category Nursery , 1th , 2nd
        // const dataPointValue = this.barChartData.datasets[datasetIndex].data[index] as number; // 5, 3, 20
        // If clicking the same bar again, reset colors
        if (this.selectedElement && this.selectedElement.datasetIndex === datasetIndex && this.selectedElement.index === index) {
            this.resetFilters();
        } else {
            // Otherwise highlight the clicked bar
            this.highlightBar(datasetIndex, index);
            this.selectedElement = { datasetIndex, index };
            this.selectedCategory = categoryId;
            this.highlightYaxisTickColor(categoryId);
            // Emit filter change event
            this.onFilterChange.emit({ filterType: 'dataPoint', data: { datasetId: datasetId, datasetLabel: datasetLabel, categoryId: categoryId } });
        }
    }

    /**
     * Highlights a specific bar by reducing opacity of all others
     */
    private highlightBar(datasetIndex: number, index: number): void {
        // Loop through each dataset
        for (let i = 0; i < this.barChartData.datasets.length; i++) {
            this.reduceOpacityForDataSet(i);
            // Set the original opacity for the selected bar
            if (i === datasetIndex) {
                if (Array.isArray(this.barChartData.datasets[datasetIndex]?.backgroundColor)) {
                    (this.barChartData.datasets[datasetIndex]?.backgroundColor as string[])[index] = this.originalColors[i];
                }
            }
        }

        // Update the chart
        this.updateChart();
    }

    handleChartLegendClick(selectedDataSetIndex: number): void {
        if (selectedDataSetIndex === this.selectedElement?.datasetIndex) {
            this.resetFilters();
            return;
        }
        this.resetFilters({ dontEmitFilters: true });
        this.selectedElement = {
            datasetIndex: selectedDataSetIndex,
            index: null
        };
        this.onFilterChange.emit({ filterType: 'series', data: { datasetId: this.datasetId, datasetLabel: this.datasets[selectedDataSetIndex].label, datasetIndex: selectedDataSetIndex } });
        // Update Colors
        this.barChartData.datasets.forEach((dataset, index) => {
            if (index === selectedDataSetIndex) {
                dataset.backgroundColor = this.originalColors[index];
                this.updateChart();
            } else {
                this.reduceOpacityForDataSet(index);
            }
        });
    }

    /**
     * Resets all colors to their original values
     */
    private resetFilters(_options?: { dontEmitFilters: boolean }): void {
        if (!this.selectedElement && !this.selectedCategory) {
            return;
        }

        // Reset backgroundColor to original solid colors for each dataset
        for (let i = 0; i < this.barChartData.datasets.length; i++) {
            // Make sure backgroundColor is an array
            if (!Array.isArray(this.barChartData.datasets[i].backgroundColor)) {
                const color = this.barChartData.datasets[i].backgroundColor as string;
                this.barChartData.datasets[i].backgroundColor = Array(this.barChartData.labels?.length).fill(color);
            }

            // Get backgroundColor array reference
            const backgroundColors = this.barChartData.datasets[i].backgroundColor as string[];

            // Reset each element in the array to the original color
            for (let j = 0; j < backgroundColors.length; j++) {
                backgroundColors[j] = this.originalColors[i];
            }

            // this.barChartOptions={...this.barChartOptions}
        }

        // Reset active element
        this.selectedElement = null;
        this.selectedCategory = null;

        // Reset Y Axis Ticks ( Categories | labels ) Colors
        this.highlightYaxisTickColor();
        // Update the chart
        this.updateChart();
        if (!_options?.dontEmitFilters) {
            this.onFilterChange.emit({ filterType: 'reset' });
        }
    }

    private reduceOpacityForDataSet(datasetIndex: number): void {
        // Update Colors
        const selectedDataList = this.barChartData.datasets[datasetIndex];

        // Ensure backgroundColor is an array
        if (!Array.isArray(this.barChartData.datasets[datasetIndex].backgroundColor)) {
            const color = this.barChartData.datasets[datasetIndex].backgroundColor as string;
            this.barChartData.datasets[datasetIndex].backgroundColor = Array(this.barChartData.labels?.length).fill(color);
        }

        const backgroundColors: string[] = (selectedDataList?.backgroundColor as string[]) || [];
        selectedDataList.backgroundColor = backgroundColors.map((color: string) => {
            return convertToTransparent(color);
        });

        this.updateChart();
    }

    /**
     * Updates the chart with a forced redraw
     */
    private updateChart(): void {
        this.chart?.update();
    }
}
