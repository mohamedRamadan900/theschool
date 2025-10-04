import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { IStackedBarChartFilter, StackedBarChartConfig } from '../../../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart-model';
import { ChartColorsArray } from '../../../../../../shared/components/charts/chart-colors';
import { StackedBarChart } from '../../../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { SchoolDataAPIService } from '../../../../services/school-data.service';
import { YearGroupStats } from '../../../../models/dashboard.interface';
import { SummaryService } from '../../services/summary.service';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard-students-by-year-group',
    imports: [StackedBarChart, DatePickerModule, FormsModule],
    templateUrl: './students-by-year-group.component.html',
    styleUrl: './students-by-year-group.component.scss'
})
export class StudentsByYearGroupComponent {
    private schoolDataService = inject(SchoolDataAPIService);
    private summaryService = inject(SummaryService);

    // date: Date | null = new Date();
    date = signal(new Date());
    studentsByYearGroupAndSexBarChart: StackedBarChartConfig;

    constructor() {
        effect(() => {
            this.getStudentsYearGroupData();
        });
    }

    private getStudentsYearGroupData(): void {
        const selectedDate = this.date(); //! Should be passed to Endpoint
        this.schoolDataService.getStudentsYearGroup().subscribe((data) => {
            console.log('Get Data');
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
            // readOnly: true
        };
    }

    onStudentsBarChartFilterChange(filter: IStackedBarChartFilter) {
        if (filter.filterType === 'reset') {
            this.summaryService.setYearGroupFilter(null);
            this.summaryService.setGenderFilter(null);
        }
        if (filter.filterType === 'category') {
            const yearGroup = filter?.data['categoryLabel'];
            this.summaryService.setYearGroupFilter(yearGroup);
        }
        if (filter.filterType === 'series') {
            const gender = filter?.data['datasetLabel'];
            this.summaryService.setGenderFilter(gender);
        }
        if (filter.filterType === 'dataPoint') {
            const yearGroup = filter?.data['categoryId'];
            const gender = filter?.data['datasetLabel'];
            this.summaryService.setGenderFilter(gender);
            this.summaryService.setYearGroupFilter(yearGroup);
        }
    }
}
