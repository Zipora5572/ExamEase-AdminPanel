import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import type { ChartConfiguration, ChartOptions } from "chart.js"
import { CommonModule } from "@angular/common"
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective , CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnChanges {
  @Input() chartData: { date: Date; count: number }[] = [];
  @Input() chartOptions: any = {}

  public lineChartData: ChartConfiguration<"line">["data"] = {
    labels: [],
    datasets: [],
  }

  public lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#202124",
        bodyColor: "#5f6368",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["chartData"]) {
      // המרת הנתונים מהשרת לפורמט המתאים
      const labels = this.chartData.map(item => new Date(item.date).toLocaleDateString());
      const data = this.chartData.map(item => item.count);
  
      this.lineChartData = {
        labels: labels,  // שימוש בתאריכים כ־labels
        datasets: [
          {
            label: 'כניסות לפי תאריך',
            data: data, // כל ספירת הכניסות (count) תעבור ל־data
            borderColor: '#42A5F5',  // צבע הקו
            fill: false,  // אם ברצונך למלא את האזור שמתחת לקו, שנה ל־true
          }
        ],
      };
    }
  
    if (changes["chartOptions"]) {
      this.lineChartOptions = {
        ...this.lineChartOptions,
        ...this.chartOptions,
      };
    }
  }
  
}
