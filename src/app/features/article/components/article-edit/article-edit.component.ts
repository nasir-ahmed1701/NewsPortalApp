import { Component, OnInit } from '@angular/core';
import {
  AlertNotificationConfig,
  AlertNotificationTypeEnum,
} from '../../../../shared/models/alert-notification-config';
import { ResultApiModel } from '../../../../shared/models/result-api.model';
import { CategoryApiModel } from '../../models/category-api.model';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleApiModel } from '../../models/article-api.model';
import { UpdateArticleRequestApiModel } from '../../models/update-article-request-api.model';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
})
export class ArticleEditComponent implements OnInit {
  alertNotificationConfig?: AlertNotificationConfig;
  categories: CategoryApiModel[] | any;
  articleFormGroup: FormGroup;
  isFormSubmitted: boolean = false;
  articleId?: number | any;
  articleToEdit?: ArticleApiModel;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleFormGroup = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    if (isNaN(this.articleId) || parseInt(this.articleId) <= 0) {
      this.router.navigateByUrl('/articles/list');
      return;
    }
    this.articleId = parseInt(this.articleId);
    this.initializeCategories();
  }

  private initializeCategories() {
    this.articleService.getAllCategories().subscribe({
      next: (res: ResultApiModel<CategoryApiModel>) => {
        if (res.isSuccessfull) {
          this.categories = res.data;
          this.getArticle();
        } else {
          this.categories = [];
          console.error(res.errors);
          this.alertNotificationConfig = {
            message: 'An errors occured',
            show: true,
            type: AlertNotificationTypeEnum.danger,
          };
        }
      },
      error: (err: any) => {
        this.categories = [];
        console.error(err.error.errors);
        this.alertNotificationConfig = {
          message: 'An errors occured',
          show: true,
          type: AlertNotificationTypeEnum.danger,
        };
      },
    });
  }

  private getArticle() {
    this.articleService.getArticle(this.articleId).subscribe({
      next: (res: ResultApiModel<ArticleApiModel>) => {
        if (res.isSuccessfull && res.data) {
          this.articleToEdit = res.data;
          this.setArticleFormValues();
        } else {
          console.error(res.errors);
          this.alertNotificationConfig = {
            message: 'An errors occured',
            show: true,
            type: AlertNotificationTypeEnum.danger,
          };
        }
      },
      error: (err: any) => {
        console.error(err.error.errors);
        this.alertNotificationConfig = {
          message: 'An errors occured',
          show: true,
          type: AlertNotificationTypeEnum.danger,
        };
      },
    });
  }

  private setArticleFormValues() {
    this.getFormControl('title').setValue(this.articleToEdit?.title);
    this.getFormControl('categoryId').setValue(this.articleToEdit?.categoryId);
    this.getFormControl('description').setValue(
      this.articleToEdit?.description
    );
    this.articleFormGroup.updateValueAndValidity();
  }
  getFormControlValue(formControlName: string) {
    return this.getFormControl(formControlName).value;
  }

  getFormControl(formControlName: string) {
    return this.articleFormGroup.controls[formControlName];
  }

  submit() {
    this.isFormSubmitted = true;
    if (this.articleFormGroup.invalid) {
      return;
    }

    const request: UpdateArticleRequestApiModel = {
      title: this.getFormControlValue('title'),
      categoryId: this.getFormControlValue('categoryId'),
      description: this.getFormControlValue('description'),
    };

    this.articleService.updateArticle(this.articleId, request).subscribe({
      next: (res: ResultApiModel<ArticleApiModel>) => {
        if (res.isSuccessfull) {
          this.articleToEdit = res.data;
          this.alertNotificationConfig = {
            message: 'changes saved',
            show: true,
            type: AlertNotificationTypeEnum.success,
          };
        }
      },
      error: (err: any) => {
        console.error(err.error.errors);
        this.alertNotificationConfig = {
          message: 'An errors occured',
          show: true,
          type: AlertNotificationTypeEnum.danger,
        };
      },
      complete: () => {},
    });
  }

  resetForm() {
    this.isFormSubmitted = false;
    this.articleFormGroup.reset();
    this.setArticleFormValues();
  }
}
