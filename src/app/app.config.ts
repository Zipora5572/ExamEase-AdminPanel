import { type ApplicationConfig, provideZoneChangeDetection } from "@angular/core"
import { provideRouter } from "@angular/router"
import { routes } from "./app.routes"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { provideStore } from "@ngrx/store"
import { provideEffects } from "@ngrx/effects"
import { authInterceptor } from "./interceptors/auth.interceptor"
import { UserEffects } from "./Store/user.effects"
import { UserReducer } from "./Store/user.reducer"
import { provideClientHydration } from "@angular/platform-browser"
import { provideCharts, withDefaultRegisterables } from "ng2-charts"

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
 
    provideRouter(routes),
    provideAnimationsAsync(),
  provideCharts(withDefaultRegisterables()),

    provideStore({
      users: UserReducer,
    }),
    provideEffects([UserEffects]),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}
