import { FavoritePage } from './../favorite/favorite.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'film',
        children: [
          {
            path: '',
            loadChildren: '../film/film.module#FilmPageModule'
          }
        ]
      },
      {
        path: 'serie',
        children: [
          {
            path: '',
            loadChildren: '../serie/serie.module#SeriePageModule'
          }
        ]
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: '../favorite/favorite.module#FavoritePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/film',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/film',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
