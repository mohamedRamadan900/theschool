import { Component } from '@angular/core';
import { SummaryStatsComponent } from './components/stats/stats.component';
import { StackedBarChart, StackedBarChartConfig } from '../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent, PieChartConfig } from '../../shared/components/charts/pie-chart/pie-chart.component';
@Component({
    selector: 'app-summary',
    imports: [SummaryStatsComponent, StackedBarChart, PieChartComponent],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss'
})
export class SummaryComponent {
    colors: string[] = ['#20c9c9', '#ff8080']; // Should be Hexadecimal color codes

    studentsByYearGroupBarChart: StackedBarChartConfig = {
        title: 'Students by Year Group',
        labels: ['Nursery', 'Reception', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
        datasets: [
            {
                label: 'Female',
                data: [5, 3, 20, 8, 10, 15, 10, 13, 11, 11, 10, 17, 20, 19, 18],
                color: this.colors[0]
            },
            {
                label: 'Male',
                data: [4, 5, 22, 8, 18, 16, 18, 21, 15, 16, 15, 24, 23, 23, 23],
                color: this.colors[1]
            }
        ],
        direction: 'horizontal',
        showTotals: false,
        hideDataLabels: false,
        aspectRatio: 0.29,
    };
    ethicityBarChart: StackedBarChartConfig = {
        title: 'Ethicity',
        labels: ['WBRI', 'NOBT', 'OARA', 'BCRB'],
        datasets: [
            {
                data: [98.6, 0.7, 0.5, 0.2],
                color: this.colors[0]
            }
        ],
        direction: 'horizontal',
        showTotals: false,
        hideDataLabels: false,
        aspectRatio: 1.1,
        isDataPercentage: true
    };

    pieChartData: PieChartConfig = {
        title: 'Gender Ratio',
        data: [300, 450],
        labels: ['Male', 'Female'],
        colors: this.colors,
        aspectRatio: 1.5
    };
}
