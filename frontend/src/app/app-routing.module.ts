import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SquadComponent } from './pages/squad/squad.component';
import { SeasonsComponent } from './pages/seasons/seasons.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';

const routes: Routes = [
  { path: 'squad', component: SquadComponent, data: {animation: 'squad'} },
  { path: 'seasons', component: SeasonsComponent, data: {animation: 'seasons'} },
  { path: 'challenges', component: ChallengesComponent, data: {animation: 'challenges'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
