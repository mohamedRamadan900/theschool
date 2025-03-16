import { Component, Input, AfterViewInit, OnChanges, OnDestroy, SimpleChanges, ElementRef, ViewChild, ChangeDetectorRef, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CardComponent } from '../../layout/card/card.component';
import { cloneDeep } from 'lodash';
import { convertToRgba } from '../../../utils/colorHelper';

// Register ALL Chart.js components and the datalabels plugin
Chart.register(...registerables, ChartDataLabels);

export interface PieChartDataItem {
    label: string;
    value: number;
    color?: string;
}
export interface PieChartConfig {
    title?: string;
    data: number[];
    labels: string[];
    colors?: string[];
    hideDataLables?: boolean;
}

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

    pieChartConfig = input<PieChartConfig | null>(null);
    // Simple data inputs
    labels: string[] = [];
    data: number[] = [];
    title: string = '';

    // Public properties for template access
    public currentColors: string[] = [];
    public selectedIndex: number | null = null;

    private chart: Chart | null = null;
    private originalColors: string[] = [];

    // Default colors
    private colors = ['#20c9c9', '#ff8080', '#ffcc80', '#80ff80', '#8080ff', '#c920c9', '#c9c920', '#20c9c9', '#ff80ff', '#80ffc9', '#c98020', '#20c980'];

    constructor(private cdr: ChangeDetectorRef) {}

    initConfig(): void {
        // ! NEED TO BE EDIT TO BE SIGNALS
        this.labels = this.pieChartConfig()?.labels || [];
        this.data = this.pieChartConfig()?.data || [];
        this.title = this.pieChartConfig()?.title || '';
        this.colors = this.pieChartConfig()?.colors || this.colors;
    }

    ngOnInit(): void {
        this.initConfig();
        // Initialize colors right away for the template
        this.originalColors = this.getColors(this.data.length);
        this.currentColors = [...this.originalColors];
    }

    ngAfterViewInit(): void {
        this.createChart();
        // Mark for check after the chart is created
        this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Update colors whenever data or labels change
        if (changes['data'] || changes['labels']) {
            this.originalColors = this.getColors(this.data?.length || 0);
            this.currentColors = [...this.originalColors];
        }

        // If chart exists, update it
        if (this.chart) {
            this.updateChart();
        }
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }

    // Method to handle legend item clicks
    public onLegendItemClick(index: number): void {
        if (this.selectedIndex === index) {
            this.resetColors();
        } else {
            this.highlightSlice(index);
        }

        // Log the clicked slice's data (same as clicking on chart)
        const label = this.labels[index];
        const value = this.data[index];
        console.log(`Clicked: ${label}: ${value}`);
    }

    private createChart(): void {
        if (!this.chartCanvas) return;

        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'pie' as ChartType,
            data: {
                labels: this.labels,
                datasets: [
                    {
                        data: this.data,
                        backgroundColor: this.colors.map(color => convertToRgba(color)),
                        borderColor: '#FFFFFF',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
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
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}`;
                            }
                        }
                    },
                    // Add datalabels configuration
                    datalabels: {
                        display: !this.pieChartConfig()?.hideDataLables,
                        color: (context) => {
                            // Choose white or black text based on background color brightness
                            const bgColorArray = context.dataset.backgroundColor;
                            const bgColor = Array.isArray(bgColorArray) ? bgColorArray[context.dataIndex] : undefined;
                            return this.isColorBright(bgColor) ? '#000' : '#fff';
                        },
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value, context) => {
                            // Calculate percentage
                            const datasetArray = context.chart.data.datasets[0].data;
                            // @ts-ignore
                            const total = datasetArray.reduce((sum, val) => sum + val, 0);
                            // @ts-ignore

                            const percentage = Math.round((value / total) * 100);
                            return percentage + '%';
                        },
                        anchor: 'center',
                        align: 'center',
                        offset: 0
                    }
                },
                onClick: (event, elements, chart) => {
                    this.handleChartClick(event, elements, chart);
                }
            },
            plugins: [ChartDataLabels] // Register the plugin for this chart instance
        });
    }

    private updateChart(): void {
        if (!this.chart) return;

        this.chart.data.labels = this.labels;
        this.chart.data.datasets[0].data = this.data;

        // Update colors if data length changed
        const bgColors = this.chart.data.datasets[0].backgroundColor;
        const needsNewColors = !bgColors || !Array.isArray(bgColors) || bgColors.length !== this.data.length;

        if (needsNewColors) {
            this.originalColors = this.getColors(this.data.length);
            this.currentColors = [...this.originalColors];
            this.chart.data.datasets[0].backgroundColor = this.originalColors;
        }

        // Update title
        if (this.chart.options?.plugins?.title) {
            this.chart.options.plugins.title.display = !!this.title;
            this.chart.options.plugins.title.text = this.title;
        }

        this.chart.update();
    }

    // Get colors based on data length
    private getColors(count: number): string[] {
        if (!count || count <= 0) return [];

        if (count <= this.colors.length) {
            return this.colors.slice(0, count);
        }

        // Generate additional colors if needed
        const colors = [...this.colors];
        const extraCount = count - this.colors.length;

        for (let i = 0; i < extraCount; i++) {
            const hue = (360 / extraCount) * i;
            colors.push(`hsl(${hue}, 70%, 60%)`);
        }

        return colors;
    }

    /**
     * Handles click events on the chart
     */
    private handleChartClick(event: any, elements: any[], chart: any): void {
        if (elements.length === 0) {
            // If clicked outside a slice, reset all colors
            this.resetColors();
            return;
        }

        // Get the index of the clicked slice
        const index = elements[0].index;

        // Extract information about the clicked slice
        const label = this.labels[index];
        const value = this.data[index];

        // Log the clicked slice's data
        console.log(`Clicked: ${label}: ${value}`);

        // If clicking the same slice again, reset colors
        if (this.selectedIndex === index) {
            this.resetColors();
        } else {
            // Otherwise highlight the clicked slice
            this.highlightSlice(index);
        }
    }

    /**
     * Highlights a specific slice by reducing opacity of all others
     */
    private highlightSlice(index: number): void {
        if (!this.chart) return;

        const dataset = this.chart.data.datasets[0];
        const backgroundColor = [] as string[];

        // Create a new array instead of modifying the existing one
        for (let i = 0; i < this.originalColors.length; i++) {
            if (i === index) {
                // Keep the clicked slice with original color
                backgroundColor[i] = this.originalColors[i];
            } else {
                // Reduce opacity for all other slices
                const color = this.originalColors[i];
                backgroundColor[i] = this.hexToRgba(color, 0.3);
            }
        }

        // Assign the new array
        dataset.backgroundColor = backgroundColor;

        // Update currentColors for template rendering
        this.currentColors = [...backgroundColor];

        // Update selected index
        this.selectedIndex = index;

        // Update the chart
        this.chart.update();

        // Trigger change detection
        this.cdr.detectChanges();
    }

    /**
     * Resets all colors to their original values
     */
    private resetColors(): void {
        if (!this.chart) return;

        const dataset = this.chart.data.datasets[0];
        dataset.backgroundColor = [...this.originalColors];

        // Update currentColors for template rendering
        this.currentColors = [...this.originalColors];

        // Reset selected element
        this.selectedIndex = null;

        // Update the chart
        this.chart.update();

        // Trigger change detection
        this.cdr.detectChanges();
    }

    /**
     * Converts hex color to rgba for transparency
     */
    private hexToRgba(hex: string, alpha: number = 1): string {
        if (!hex) return `rgba(0, 0, 0, ${alpha})`;

        // Handle shorthand hex (e.g., #FFF)
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

        // Parse hex to rgb
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return hex; // Return original if parsing fails

        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Determines if a color is bright (to choose contrasting text color)
     */
    private isColorBright(color: string | undefined): boolean {
        if (!color) return false;
        let r = 0,
            g = 0,
            b = 0;

        if (color.startsWith('rgba')) {
            // Handle rgba format
            const parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
            if (!parts) return false;
            r = parseInt(parts[1], 10);
            g = parseInt(parts[2], 10);
            b = parseInt(parts[3], 10);
        } else if (color.startsWith('rgb')) {
            // Handle rgb format
            const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (!parts) return false;
            r = parseInt(parts[1], 10);
            g = parseInt(parts[2], 10);
            b = parseInt(parts[3], 10);
        } else if (color.startsWith('hsl')) {
            // For HSL colors, convert to hex first (simplified approach)
            return false; // Default to not bright for HSL
        } else {
            // Handle hex format
            const hex = color.replace(/^#/, '');
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            }
        }

        // Calculate brightness (YIQ formula)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    }
}
