import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './analytics-card.component.html',
  styleUrl: './analytics-card.component.css'
})
export class AnalyticsCardComponent {
  @Input() title = ""
  @Input() showActions = false
}
