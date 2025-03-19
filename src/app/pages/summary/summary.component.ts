import { Component } from '@angular/core';
import { SummaryStatsComponent } from './components/stats/stats.component';
import { PieChartComponent } from '../../shared/components/charts/pie-chart/pie-chart.component';
import { ChartColorsArray } from '../../shared/components/charts/chart-colors';
import { SummaryService } from './services/summary.service';
import { IStackedBarChartFilter, StackedBarChartConfig } from '../../shared/models/stacked-bar-chart-model';
import { StackedBarChart } from '../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { PieChartConfig } from '../../shared/models/pie-chart.model';
@Component({
    selector: 'app-summary',
    imports: [SummaryStatsComponent, StackedBarChart, PieChartComponent],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss',
    providers: [SummaryService]
})
export class SummaryComponent {
    studentsByYearGroupBarChart: StackedBarChartConfig = {
        title: 'Students by Year Group',
        categories: ['Nursery', 'Reception', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th'],
        datasetId: 'Gender',
        datasets: [
            {
                label: 'Female',
                data: [5, 3, 20, 8, 10, 15, 10, 13, 11, 11, 10, 17, 20, 19, 18],
                color: ChartColorsArray[0]
            },
            {
                label: 'Male',
                data: [4, 5, 22, 8, 18, 16, 18, 21, 15, 16, 15, 24, 23, 23, 23],
                color: ChartColorsArray[1]
            }
        ],
        direction: 'horizontal',
        showTotals: false,
        hideDataLabels: false,
        aspectRatio: 0.45
    };
    ethicityBarChart: StackedBarChartConfig = {
        // id: 'ethicityBarChart',
        title: 'Ethicity',
        categories: ['WBRI', 'NOBT', 'OARA', 'BCRB'],
        datasetId: 'Ethicity',
        datasets: [
            {
                label: 'Ethicity',
                data: [98.6, 0.7, 0.5, 0.2],
                color: ChartColorsArray[0]
            }
        ],
        direction: 'horizontal',
        showTotals: false,
        hideDataLabels: false,
        aspectRatio: 0.84,
        isDataPercentage: true,
        showLegend: false
    };

    genderRatio: PieChartConfig = {
        datasetId: 'GenderRatio',
        title: 'Gender Ratio',
        data: [300, 450],
        labels: ['Female', 'Male'],
        colors: ChartColorsArray,
        aspectRatio: 1.5
    };
    boarderRatio: PieChartConfig = {
        title: 'Boarder Ratio',
        datasetId: 'boarderRatio',
        data: [150, 200, 350, 600],
        labels: ['Boarder 7 Nights', 'Boarder 6 Nights', 'Boarder night per week', 'Not a borader'],
        colors: ChartColorsArray,
        aspectRatio: 1.5
    };

    attendanceByYear: StackedBarChartConfig = {
        title: 'Attendance By Year',
        categories: ['Nursery', 'Reception', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th'],
        datasetId: 'attendanceByYear',
        datasets: [
            {
                label: 'Attendance',
                data: [96.9, 96.2, 96.4, 96.8, 96.5, 96.5, 97.0, 96.7, 96.5, 96.5, 96.6, 96.5, 96.6, 96.7, 96.5],
                color: ChartColorsArray[0]
            }
        ],
        direction: 'horizontal',
        showTotals: false,
        hideDataLabels: false,
        aspectRatio: 0.44,
        isDataPercentage: true,
        showLegend: false
    };

    constructor(private summaryService: SummaryService) {}

    onStudentsBarChartFilterChange(filter: IStackedBarChartFilter) {
        console.log('Filter changed', filter);
    }
}
