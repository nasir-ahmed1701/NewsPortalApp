import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () =>
      import('../app/features/article/article.module').then(
        (m) => m.ArticleModule
      ),
  },
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
