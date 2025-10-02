import { Component } from '@angular/core';
import { SummaryStatsComponent } from './components/stats/stats.component';
import { StackedBarChart } from '../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent } from '../../../../shared/components/charts/pie-chart/pie-chart.component';
import { MapComponent, MapMarker } from '../../../../shared/components/charts/map/map.component';
import { TableComponent } from '../../../../shared/components/charts/table/table.component';
import { FilterPanelComponent } from '../../../../shared/components/filter-panel/filter-panel.component';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { SchoolDataMockService } from '../../services/school-data-mock.service';
import { SchoolDataService } from '../../services/school-data.service';
import { SummaryService } from './services/summary.service';
import { IStackedBarChartFilter, StackedBarChartConfig } from '../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart-model';
import { ChartColorsArray } from '../../../../shared/components/charts/chart-colors';
import { PieChartConfig } from '../../../../shared/components/charts/pie-chart/pie-chart.model';
import { StudentsByYearGroupComponent } from './components/students-by-year-group/students-by-year-group.component';
import { GenderRatioComponent } from './components/gender-ratio/gender-ratio.component';

@Component({
    selector: 'app-summary',
    imports: [SummaryStatsComponent, StackedBarChart, PieChartComponent, MapComponent, TableComponent, FilterPanelComponent, DashboardNavbarComponent, StudentsByYearGroupComponent, GenderRatioComponent],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss',
    providers: [SummaryService, { provide: SchoolDataService, useClass: SchoolDataMockService }]
})
export class SummaryComponent {
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
        isDataPercentage: true,
        showLegend: false
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
        isDataPercentage: true,
        showLegend: false
    };

    mapMarkers: MapMarker[] = [
        {
            id: 1,
            lat: 30.0444,
            lng: 31.2357,
            title: 'Cairo School',
            popup: '700 Students'
        },
        {
            id: 2,
            lat: 31.2156,
            lng: 29.9553,
            title: 'Alexandria Branch',
            popup: '400 Students'
        },
        {
            id: 3,
            lat: 25.6872,
            lng: 32.6396,
            title: 'Luxor Campus',
            popup: '300 Students'
        },
        {
            id: 4,
            lat: 27.1801,
            lng: 31.1837,
            title: 'Asyut Academy',
            popup: '250 Students'
        },
        {
            id: 5,
            lat: 30.5852,
            lng: 31.502,
            title: 'Zagazig Institute',
            popup: '200 Students'
        },
        {
            id: 6,
            lat: 31.1321,
            lng: 33.8033,
            title: 'Port Said School',
            popup: '350 Students'
        },
        {
            id: 7,
            lat: 29.3099,
            lng: 30.8418,
            title: 'Fayoum University',
            popup: '500 Students'
        },
        {
            id: 8,
            lat: 31.0409,
            lng: 31.3785,
            title: 'Mansoura Campus',
            popup: '450 Students'
        },
        {
            id: 9,
            lat: 26.556,
            lng: 31.6948,
            title: 'Sohag Branch',
            popup: '300 Students'
        },
        {
            id: 10,
            lat: 31.609,
            lng: 31.2472,
            title: 'Damietta School',
            popup: '150 Students'
        }
    ];

    mapMarkersWithAddress: MapMarker[] = [
        {
            id: 1,
            title: 'Cairo School',
            popup: '700 Students',
            address: '12 Hassan El Mamoune, Nasr City, Cairo Governorate 11765, Egypt'
        },
        {
            id: 2,
            title: 'Alexandria Branch',
            popup: '400 Students',
            address: '25 El-Horreya Road, Al Attarin, Alexandria Governorate 21599, Egypt'
        },
        {
            id: 3,
            title: 'Luxor Campus',
            popup: '300 Students',
            address: 'Karnak Temple Road, Al Karnak, Luxor, Luxor Governorate, Egypt'
        },
        {
            id: 4,
            title: 'Asyut Academy',
            popup: '250 Students',
            address: '15 El-Gomhoreya Street, First District, Asyut, Asyut Governorate 71111, Egypt'
        },
        {
            id: 5,
            title: 'Zagazig Institute',
            popup: '200 Students',
            address: '8 University Street, Al Moatasem, Zagazig, Ash Sharqia Governorate 44519, Egypt'
        },
        {
            id: 6,
            title: 'Port Said School',
            popup: '350 Students',
            address: '30 El-Shohadaa Street, Al-Arab District, Port Said Governorate 42511, Egypt'
        },
        {
            id: 7,
            title: 'Fayoum University',
            popup: '500 Students',
            address: '10 Gamal Abdel Nasser Street, Keman Fares, Fayoum Governorate 63514, Egypt'
        },
        {
            id: 8,
            title: 'Mansoura Campus',
            popup: '450 Students',
            address: '5 El-Gomhoreya Street, Toreil, Mansoura, Dakahlia Governorate 35511, Egypt'
        },
        {
            id: 9,
            title: 'Sohag Branch',
            popup: '300 Students',
            address: '20 El-Nile Street, El-Shahid, Sohag Governorate 82524, Egypt'
        },
        {
            id: 10,
            title: 'Damietta School',
            popup: '150 Students',
            address: '3 Port Said Street, Ezbet El-Borg, Damietta Governorate 34517, Egypt'
        }
    ];

    studentDirectoryTable = {
        columns: [
            // { key: 'id', label: 'ID', sortable: true },
            { key: 'fullName', label: 'Full Name', sortable: true },
            { key: 'attendance', label: 'Att %', sortable: true, showPercent: true }
        ],
        rows: [
            { id: 1, fullName: 'John Smith', attendance: 95.5 },
            { id: 2, fullName: 'Sarah Johnson', attendance: 99.0 },
            { id: 3, fullName: 'Michael Brown', attendance: 45.7 },
            { id: 4, fullName: 'Emily Davis', attendance: 87.3 },
            { id: 5, fullName: 'James Wilson', attendance: 32.8 },
            { id: 6, fullName: 'Jessica Taylor', attendance: 76.1 },
            { id: 7, fullName: 'William Anderson', attendance: 53.9 },
            { id: 8, fullName: 'Emma Martinez', attendance: 97.8 },
            { id: 9, fullName: 'David Thompson', attendance: 65.2 },
            { id: 10, fullName: 'Sophia Garcia', attendance: 88.5 },
            { id: 11, fullName: 'Daniel Lee', attendance: 34.3 },
            { id: 12, fullName: 'Olivia Moore', attendance: 96.7 },
            { id: 13, fullName: 'Alexander White', attendance: 43.1 },
            { id: 14, fullName: 'Isabella Clark', attendance: 77.5 },
            { id: 15, fullName: 'Matthew Hall', attendance: 55.9 },
            { id: 1, fullName: 'John Smith', attendance: 95.5 },
            { id: 2, fullName: 'Sarah Johnson', attendance: 99.0 },
            { id: 3, fullName: 'Michael Brown', attendance: 45.7 },
            { id: 4, fullName: 'Emily Davis', attendance: 87.3 },
            { id: 5, fullName: 'James Wilson', attendance: 32.8 },
            { id: 6, fullName: 'Jessica Taylor', attendance: 76.1 },
            { id: 7, fullName: 'William Anderson', attendance: 53.9 },
            { id: 8, fullName: 'Emma Martinez', attendance: 97.8 },
            { id: 9, fullName: 'David Thompson', attendance: 65.2 },
            { id: 10, fullName: 'Sophia Garcia', attendance: 88.5 },
            { id: 11, fullName: 'Daniel Lee', attendance: 34.3 },
            { id: 12, fullName: 'Olivia Moore', attendance: 96.7 },
            { id: 13, fullName: 'Alexander White', attendance: 43.1 },
            { id: 14, fullName: 'Isabella Clark', attendance: 77.5 },
            { id: 15, fullName: 'Matthew Hall', attendance: 55.9 },
            { id: 7, fullName: 'William Anderson', attendance: 53.9 },
            { id: 8, fullName: 'Emma Martinez', attendance: 97.8 },
            { id: 9, fullName: 'David Thompson', attendance: 65.2 },
            { id: 10, fullName: 'Sophia Garcia', attendance: 88.5 },
            { id: 11, fullName: 'Daniel Lee', attendance: 34.3 }
        ]
    };

    constructor(
        private summaryService: SummaryService,
        private schoolDataService: SchoolDataService
    ) {}

    onMapMarkersSelection(marker: any) {
        console.log('Marker clicked:', marker);
    }

    onTableSelection(selected: any): void {
        console.log(selected);
    }
    onTableSelectionReset(selected: any): void {
        console.log(selected);
    }

    ngOnInit(): void {}
}
