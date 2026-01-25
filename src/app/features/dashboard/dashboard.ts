import { Component } from '@angular/core';
import { BarChartComponent } from '../../components/bar-chart/bar-chart';
import { PieChartComponent  } from '../../components/pie-chart/pie-chart';
import { LineChartComponent } from '@components/line-chart/line-chart';
import { DoughnutChartComponent } from '@components/doughnut-chart/doughnut-chart';
import { PolarAreaChartComponent } from '@components/polar-area-chart/polar-area-chart';

@Component({
  selector: 'app-dashboard',
  imports: [
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    PolarAreaChartComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
