import { Component, inject, OnInit } from '@angular/core';
import { ChartColorsArray } from '../../../../../../shared/components/charts/chart-colors';
import { PieChartConfig } from '../../../../../../shared/components/charts/pie-chart/pie-chart.model';
import { PieChartComponent } from '../../../../../../shared/components/charts/pie-chart/pie-chart.component';
import { SchoolDataAPIService } from '../../../../services/school-data.service';
import { SexStats } from '../../../../models/dashboard.interface';

@Component({
    selector: 'app-dashboard-gender-ratio',
    imports: [PieChartComponent],
    templateUrl: './gender-ratio.component.html',
    styleUrl: './gender-ratio.component.scss'
})
export class GenderRatioComponent implements OnInit {
    private schoolDataService = inject(SchoolDataAPIService);

    genderRatioChartConfig: PieChartConfig;

    ngOnInit(): void {
        this.schoolDataService.getSexStats().subscribe((sexStats: SexStats) => {
            this.genderRatioChartConfig = {
                datasetId: 'GenderRatio',
                title: 'Gender Ratio',
                data: [sexStats.Male, sexStats.Female],
                labels: ['Male', 'Female'],
                colors: ChartColorsArray,
                aspectRatio: 1.5,
                readOnly: true
            };
        });
    }
}
