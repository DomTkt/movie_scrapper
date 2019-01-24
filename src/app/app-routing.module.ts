
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'film', loadChildren: './film/film.module#FilmPageModule' },
  { path: 'serie', loadChildren: './serie/serie.module#SeriePageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule'},
  { path: 'saison-details/:id/:numberSeason', loadChildren: './saison-details/saison-details.module#SaisonDetailsPageModule' },
  { path: 'episode-saison/:id/:saisonNumber/:episodeNumber', loadChildren: './episode-saison/episode-saison.module#EpisodeSaisonPageModule' },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
