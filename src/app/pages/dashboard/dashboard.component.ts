import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { StatCardComponent } from "../../components/stat-card/stat-card.component"
import { LineChartComponent } from "../../components/charts/line-chart/line-chart.component"
import { PieChartComponent } from "../../components/charts/pie-chart/pie-chart.component"
import { BarChartComponent } from "../../components/charts/bar-chart/bar-chart.component"
import { AnalyticsService } from "../../services/analytics.service"
import { AnalyticsCardComponent } from "../../components/analytics-card/analytics-card.component"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    StatCardComponent,
    AnalyticsCardComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  totalUsers: number
  activeUsers: number
  newUsers: number
  dailyEntries: number
  weeklyEntries: number

  userActivityData: any
  actionFrequencyData: any
  hourlyActivityData: any

  popularPages: any[]

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.initStatsData()
    this.initChartData()
  }

  initStatsData(): void {
    this.analyticsService.getDailyEntries().subscribe(data => {
      this.dailyEntries = data
    })

    this.analyticsService.getWeeklyEntries().subscribe(data => {
      this.weeklyEntries = data
    })

    this.analyticsService.getTotalUsers().subscribe(data => {
      this.totalUsers = data
    })

    this.analyticsService.getNewUsersToday().subscribe(data => {
      this.newUsers = data
    })

    this.analyticsService.getPopularPages().subscribe(data => {
      this.popularPages = data
    })
  }

  initChartData(): void {
    this.analyticsService.getUserActivityData().subscribe(data => {
      this.userActivityData = data
    })

    this.analyticsService.getActionFrequencyData().subscribe(data => {
      this.actionFrequencyData = data
    })

    this.analyticsService.getHourlyActivityData().subscribe(data => {
      this.hourlyActivityData = data
    })
  }
}
