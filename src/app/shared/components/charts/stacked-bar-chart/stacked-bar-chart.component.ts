import { Component, ElementRef, HostListener, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CardComponent } from '../../layout/card/card.component';
import { convertToRgba } from '../../../utils/colorHelper';

// Register the required Chart.js components
// Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// Interface for the entire chart configuration
export interface StackedBarChartConfig {
    title: string;
    labels: string[];
    datasets: BarChartDataset[];
    direction?: 'horizontal' | 'vertical';
    aspectRatio?: number;
    hideDataLabels?: boolean;
    showTotals?: boolean;
    isDataPercentage?: boolean;
}
export interface BarChartDataset {
    label?: string;
    data: number[];
    color: string;
}

@Component({
    selector: 'app-stacked-bar-chart',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, CardComponent],
    templateUrl: './stacked-bar-chart.component.html',
    styleUrl: './stacked-bar-chart.component.scss',
    host: {
        onresize: 'onResize($event)'
    }
})
export class StackedBarChart implements OnInit, OnChanges {
    @Input() chartConfig: StackedBarChartConfig | null = null;

    // Computed properties for chart configuration
    get title(): string {
        return this.chartConfig?.title || '';
    }

    get labels(): string[] {
        return this.chartConfig?.labels || [];
    }

    get datasets(): BarChartDataset[] {
        return this.chartConfig?.datasets || [];
    }

    get isHorizontal(): boolean {
        return this.chartConfig?.direction === 'horizontal';
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

    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: []
    };

    public barChartOptions: ChartConfiguration['options'] = {
        indexAxis: 'y', // Default to horizontal bars
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
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
                    label: (context) => {
                        const label = context.dataset.label || '';
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
                }
            }
        },
        onClick: (event, elements, chart) => {
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
        this.barChartData.labels = this.labels;

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
            this.chart.chart.update();
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
            this.resetColors();
            return;
        }
        // Get the dataset index and data index of the clicked bar
        const datasetIndex = elements[0].datasetIndex;
        const index = elements[0].index;

        // Extract information about the clicked bar
        const label = this.barChartData.labels?.[index] as string;
        const value = this.barChartData.datasets[datasetIndex].data[index] as number;
        const datasetLabel = this.barChartData.datasets[datasetIndex].label;

        // Log the clicked bar's data
        console.log(`Clicked: ${label}, ${datasetLabel}: ${value}`);

        // If clicking the same bar again, reset colors
        if (this.selectedElement && this.selectedElement.datasetIndex === datasetIndex && this.selectedElement.index === index) {
            this.resetColors();
            this.selectedElement = null;
        } else {
            // Otherwise highlight the clicked bar
            this.highlightBar(datasetIndex, index);
            this.selectedElement = { datasetIndex, index };
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
            this.resetColors();
            console.log(this.selectedElement);
            return;
        }
        this.selectedElement = {
            datasetIndex: selectedDataSetIndex,
            index: null
        };
        console.log(this.selectedElement);
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
    private resetColors(): void {
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
        }

        // Reset active element
        this.selectedElement = null;

        // Update the chart
        this.updateChart();
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
            // Parse the original color to extract RGB values
            const colorStr = color;
            const rgbMatch = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);

            if (rgbMatch) {
                const r = rgbMatch[1];
                const g = rgbMatch[2];
                const b = rgbMatch[3];
                return `rgba(${r}, ${g}, ${b}, 0.3)`;
            }

            return colorStr;
        });

        this.updateChart();
    }

    /**
     * Updates the chart with a forced redraw
     */
    private updateChart(): void {
        // Force data update
        this.barChartData = { ...this.barChartData };

        // Update the chart with animation disabled to ensure immediate update
        if (this.chart?.chart) {
            this.chart.chart.update('none');

            // Then update again with a slight delay with animation
            setTimeout(() => {
                if (this.chart?.chart) {
                    this.chart.chart.update();
                }
            }, 50);
        }
    }
}
