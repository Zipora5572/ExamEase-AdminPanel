import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() icon = "analytics"
  @Input() iconBgColor = "#e8f0fe"
  @Input() iconColor = "#1a73e8"
  @Input() value: string | number = 0
  @Input() label = ""
  @Input() trend = ""
  @Input() trendDirection: "up" | "down" | "" = ""
}
