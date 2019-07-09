import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquadComponent } from './pages/squad/squad.page';
import { SeasonsComponent } from './pages/seasons/seasons.page';
import { ChallengesComponent } from './pages/challenges/challenges.page';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreComponent } from './pages/store/store.page';
import { LayoutService } from './layout/layout.service';
import { ActivesquadComponent } from './pages/squad/active-squad/active-squad.page';
import { TrainingComponent } from './pages/squad/training/training.page';
import { ClubComponent } from './pages/squad/club/club.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PitchPlayerCardModule } from 'pitch-player-card'
import { StoreHttpService } from './pages/store/store.service';
import { PlayerAlreadyInSquadPipe } from './pipes/player-already-in-squad.pipe';
import { TokenInterceptor } from './auth/token.interceptor';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TimeAgoPipe } from 'time-ago-pipe';
import { BuyPageComponent } from './pages/store/buy/buy.page';
import { ReadyToOpenComponent } from './pages/store/open/open.page';
import { MatchComponent } from './pages/match/match.component';
import { CurrentSeasonPage } from './pages/seasons/current-season/current-season.page';
import { MatchHistoryPage } from './pages/seasons/match-history/match-history.page';
import { HomePage } from './pages/home/home.page';
import { ThousandSuffixesPipe } from './pipes/thousand-suffixes.pipe';
import { OpenPackPopupComponent } from './components/open-pack-popup/open-pack-popup.component';

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
    PlayerAlreadyInSquadPipe,
    ThousandSuffixesPipe,
    TimeAgoPipe,
    BuyPageComponent,
    ReadyToOpenComponent,
    MatchComponent,
    CurrentSeasonPage,
    MatchHistoryPage,
    HomePage,
    OpenPackPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PitchPlayerCardModule,
    InfiniteScrollModule,
    FormsModule
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
    }],
  entryComponents: [OpenPackPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
