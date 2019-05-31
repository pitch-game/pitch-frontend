import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquadComponent } from './pages/squad/squad.page';
import { SeasonsComponent } from './pages/seasons/seasons.page';
import { ChallengesComponent } from './pages/challenges/challenges.page';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreComponent } from './pages/store/store.page';
import { LayoutService } from './layout/layout.service';
import { ActivesquadComponent } from './pages/squad/active-squad/active-squad.page';
import { TrainingComponent } from './pages/squad/training/training.page';
import { ClubComponent } from './pages/squad/club/club.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PitchPlayerCardModule } from 'pitch-player-card'
import { StoreHttpService } from './pages/store/store.service';
import { PlayerAlreadyInSquadPipe } from './pipes/player-already-in-squad.pipe';

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
    PlayerAlreadyInSquadPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PitchPlayerCardModule
  ],
  providers: [AuthGuardService, AuthService, LayoutService, StoreHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
