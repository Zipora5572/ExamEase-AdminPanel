import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { MatSidenavModule } from "@angular/material/sidenav"
import { RouterModule, RouterOutlet } from "@angular/router"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { HeaderComponent } from "./components/header/header.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSidenavModule, RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Admin-Dashboard"
}
