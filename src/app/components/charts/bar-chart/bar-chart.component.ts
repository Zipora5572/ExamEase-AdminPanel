import { Component, Input, type OnChanges, type SimpleChanges } from "@angular/core"
import { BaseChartDirective  } from "ng2-charts"
import type { ChartConfiguration, ChartOptions } from "chart.js"
import { CommonModule } from "@angular/common"

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective , CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnChanges {
  @Input() chartData: { hour: number; count: number }[] = [];

  @Input() chartOptions: any = {}
  
  
  public barChartData: ChartConfiguration<"bar">["data"] = {
    labels: [],
    datasets: [],
  }

  public barChartOptions: ChartOptions<"bar"> = {
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
      // מכין מערך ריק של 24 שעות
      const fullDayHours = Array.from({ length: 24 }, (_, i) => i);
  
      // ממפה את הנתונים שהגיעו לפי שעה
      const dataMap = new Map(this.chartData.map(item => [item.hour, item.count]));
  
      // בונה את המידע ל־chart כך שכל שעה תהיה מיוצגת
      const labels = fullDayHours.map(hour => hour.toString().padStart(2, '0') + ":00");
      const data = fullDayHours.map(hour => dataMap.get(hour) ?? 0);
  
      this.barChartData = {
        labels,
        datasets: [
          {
            label: 'כניסות לפי שעה',
            data,
            backgroundColor: '#42A5F5',
          }
        ]
      };
    }
  
    if (changes["chartOptions"]) {
      this.barChartOptions = {
        ...this.barChartOptions,
        ...this.chartOptions,
      };
    }
  }
  
  
}
