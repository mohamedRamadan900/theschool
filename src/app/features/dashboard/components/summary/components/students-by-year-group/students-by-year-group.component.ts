import { Component, inject, OnInit } from '@angular/core';
import { IStackedBarChartFilter, StackedBarChartConfig } from '../../../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart-model';
import { ChartColorsArray } from '../../../../../../shared/components/charts/chart-colors';
import { StackedBarChart } from '../../../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { SchoolDataService } from '../../../../services/school-data.service';
import { YearGroupStats } from '../../../../models/dashboard.interface';

@Component({
    selector: 'app-dashboard-students-by-year-group',
    imports: [StackedBarChart],
    templateUrl: './students-by-year-group.component.html',
    styleUrl: './students-by-year-group.component.scss'
})
export class StudentsByYearGroupComponent implements OnInit {
    private schoolDataService = inject(SchoolDataService);
    studentsByYearGroupAndSexBarChart: StackedBarChartConfig;

    ngOnInit(): void {
        this.schoolDataService.getStudentsYearGroup().subscribe((data) => {
            this.studentsByYearGroupAndSexBarChart = this.prepareChartConfig(data);
        });
    }

    private prepareChartConfig(yearGroupStats: YearGroupStats): StackedBarChartConfig {
        const categories = Object.keys(yearGroupStats);
        const maleData: number[] = [];
        const femaleData: number[] = [];

        categories.forEach((yearGroup) => {
            const stats = yearGroupStats[yearGroup];
            maleData.push(stats.Male || 0);
            femaleData.push(stats.Female || 0);
        });

        return {
            title: 'Students by Year Group',
            categories,
            datasetId: 'Gender',
            datasets: [
                {
                    label: 'Male',
                    data: maleData,
                    color: ChartColorsArray[0]
                },
                {
                    label: 'Female',
                    data: femaleData,
                    color: ChartColorsArray[1]
                }
            ],
            direction: 'horizontal',
            showTotals: false,
            hideDataLabels: false,
            showLegend: true,
            readOnly: true
        };
    }

    onStudentsBarChartFilterChange(filter: IStackedBarChartFilter) {
        console.log('Filter changed', filter);
    }
}
