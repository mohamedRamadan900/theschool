import { Component } from '@angular/core';
import { ChartColorsArray } from '../../../../../../shared/components/charts/chart-colors';
import { PieChartConfig } from '../../../../../../shared/components/charts/pie-chart/pie-chart.model';
import { PieChartComponent } from '../../../../../../shared/components/charts/pie-chart/pie-chart.component';
import { StackedBarChart } from '../../../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';

@Component({
    selector: 'app-dashboard-gender-ratio',
    imports: [PieChartComponent,StackedBarChart],
    templateUrl: './gender-ratio.component.html',
    styleUrl: './gender-ratio.component.scss'
})
export class GenderRatioComponent {
    genderRatio: PieChartConfig = {
        datasetId: 'GenderRatio',
        title: 'Gender Ratio',
        data: [300, 450],
        labels: ['Female', 'Male'],
        colors: ChartColorsArray,
        aspectRatio: 1.5
    };
}
