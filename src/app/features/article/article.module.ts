import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { AlertNotificationComponent } from '../../shared/components/alert-notification/alert-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    AlertNotificationComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ArticleModule {}
