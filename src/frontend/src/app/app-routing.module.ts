
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SquadComponent } from './pages/squad/squad.page';
import { SeasonsComponent } from './pages/seasons/seasons.page';
import { ChallengesComponent } from './pages/challenges/challenges.page';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { StoreComponent } from './pages/store/store.component';
import { ActivesquadComponent } from './pages/squad/active-squad/active-squad.page';
import { TrainingComponent } from './pages/squad/training/training.page';
import { ClubComponent } from './pages/squad/club/club.page';

const routes: Routes = [
  { path: 'squad', component: SquadComponent, data: {animation: 'squad'}, canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full', data: {animation: 'squad'}},
      { path: 'active', component: ActivesquadComponent, data: {animation: 'squad'} },
      { path: 'training', component: TrainingComponent, data: {animation: 'squad'} },
      { path: 'club', component: ClubComponent, data: {animation: 'squad'} }
    ]
  },
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
