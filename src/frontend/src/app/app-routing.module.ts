
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SquadComponent } from './pages/squad/squad.component';
import { SeasonsComponent } from './pages/seasons/seasons.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { StoreComponent } from './pages/store/store.component';

const routes: Routes = [
  { path: 'squad', component: SquadComponent, data: {animation: 'squad'}, canActivate: [AuthGuardService] },
  { path: 'seasons', component: SeasonsComponent, data: {animation: 'seasons'}, canActivate: [AuthGuardService] },
  { path: 'challenges', component: ChallengesComponent, data: {animation: 'challenges'}, canActivate: [AuthGuardService] },
  { path: 'store', component: StoreComponent, data: { animation: 'store'}, canActivate: [AuthGuardService] },
  { path: 'auth-callback', component: AuthCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
