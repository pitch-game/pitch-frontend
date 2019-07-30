import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquadComponent } from './pages/squad/squad.page';
import { SeasonsComponent } from './pages/seasons/seasons.page';
import { ChallengesComponent } from './pages/challenges/challenges.page';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { AuthService } from './auth/services/auth.service';
import { AuthCallbackComponent } from './auth/components/auth-callback/auth-callback.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreComponent } from './pages/store/store.page';
import { LayoutService } from './services/layout.service';
import { ActivesquadComponent } from './pages/squad/active-squad/active-squad.page';
import { TrainingComponent } from './pages/squad/training/training.page';
import { ClubComponent } from './pages/squad/club/club.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PitchPlayerCardModule } from 'pitch-player-card'
import { StoreHttpService } from './services/http/store.http-service';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TimeAgoPipe } from 'time-ago-pipe';
import { BuyPageComponent } from './pages/store/buy/buy.page';
import { ReadyToOpenComponent } from './pages/store/open/open.page';
import { MatchComponent } from './pages/match/match.page';
import { CurrentSeasonPage } from './pages/seasons/current-season/current-season.page';
import { MatchHistoryPage } from './pages/seasons/match-history/match-history.page';
import { HomePage } from './pages/home/home.page';
import { ThousandSuffixesPipe } from './pipes/thousand-suffixes.pipe';
import { OpenPackPopupComponent } from './components/open-pack-popup/open-pack-popup.component';
import { UnauthorizedInterceptor } from './auth/interceptors/unauthorized.interceptor';
import { SubstitutionModalComponent } from './components/substitution-modal/substitution-modal.component';

import { AuthModule, OidcSecurityService, OpenIdConfiguration, AuthWellKnownEndpoints, OidcConfigService, ConfigResult } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SquadComponent,
    SeasonsComponent,
    ChallengesComponent,
    StoreComponent,
    AuthCallbackComponent,
    ActivesquadComponent,
    TrainingComponent,
    ClubComponent,
    ThousandSuffixesPipe,
    TimeAgoPipe,
    BuyPageComponent,
    ReadyToOpenComponent,
    MatchComponent,
    CurrentSeasonPage,
    MatchHistoryPage,
    HomePage,
    OpenPackPopupComponent,
    SubstitutionModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PitchPlayerCardModule,
    InfiniteScrollModule,
    FormsModule,
    AuthModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    LayoutService,
    StoreHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    }],
  entryComponents: [OpenPackPopupComponent, SubstitutionModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
      const config: OpenIdConfiguration = {
        stsServer: environment.identityEndpoint,
        client_id: "cbf24cc4a1bb79e441a5b5937be6dd84",
        redirect_url: environment.appUri + "/auth-callback",
        post_logout_redirect_uri: environment.appUri,
        response_type: "id_token",
        scope: "openid",
        post_login_route: "",
        log_console_debug_active: true,
        log_console_warning_active: true,
        storage: localStorage,
        disable_iat_offset_validation: true
      };

      this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
  }
}

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.load_using_custom_stsServer(
      `${environment.identityEndpoint}/.well-known/openid-configuration`
    );
}