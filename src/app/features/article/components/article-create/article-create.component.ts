import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertNotificationConfig,
  AlertNotificationTypeEnum,
} from '../../../../shared/models/alert-notification-config';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.css',
})
export class ArticleCreateComponent {
  alertNotificationConfig?: AlertNotificationConfig;
  
  constructor(private spinner: NgxSpinnerService) {}

  test() {
    this.alertNotificationConfig = {
      message: 'changes have been saved',
      show: true,
      type: AlertNotificationTypeEnum.danger,
    };
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
