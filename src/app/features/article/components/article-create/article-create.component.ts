import { Component, OnInit } from '@angular/core';
import {
  AlertNotificationConfig,
  AlertNotificationTypeEnum,
} from '../../../../shared/models/alert-notification-config';
import { ResultApiModel } from '../../../../shared/models/result-api.model';
import { CategoryApiModel } from '../../models/category-api.model';
import { ArticleService } from '../../services/article.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateArticleRequestApiModel } from '../../models/create-article-request-api.model';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.css',
})
export class ArticleCreateComponent implements OnInit {
  alertNotificationConfig?: AlertNotificationConfig;
  categories: CategoryApiModel[] | any;
  articleFormGroup: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.articleFormGroup = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeCategories();
  }


  initializeCategories() {
    this.articleService.getAllCategories().subscribe({
      next: (res: ResultApiModel<CategoryApiModel>) => {
        if (res.isSuccessfull) {
          this.categories = res.data;
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

    const request: CreateArticleRequestApiModel = {
      title: this.getFormControlValue('title'),
      categoryId: this.getFormControlValue('categoryId'),
      description: this.getFormControlValue('description'),
    };

    this.articleService.createArticle(request).subscribe({
      next: (res: ResultApiModel<number>) => {
        if (res.isSuccessfull) {
          this.alertNotificationConfig = {
            message: 'record created',
            show: true,
            type: AlertNotificationTypeEnum.success,
          };
          this.resetForm();
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
  }
}
