import { Component, Input, type OnChanges, type SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"

import type { ChartConfiguration, ChartOptions } from "chart.js"
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective , CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges {
  @Input() chartData: { [key: string]: number } = {}
  @Input() chartOptions: any = {}

  public pieChartData: ChartConfiguration<"pie">["data"] = {
    labels: [],
    datasets:  [{
      data: [], // כאן נכניס את המספרים עבור כל פעולה
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // צבעים שונים לכל חלק
    }],
  }

  public pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#202124",
        bodyColor: "#5f6368",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    },
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["chartData"]) {
      this.pieChartData = {
        labels: Object.keys(this.chartData), // מקבל את שם הפעולות כlabels
        datasets: [{
          data: Object.values(this.chartData), // מקבל את הערכים כdata
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // צבעים לכל פעולה
        }],
      }
    }

    if (changes["chartOptions"]) {
      this.pieChartOptions = {
        ...this.pieChartOptions,
        ...this.chartOptions,
      }
    }
  }
}

