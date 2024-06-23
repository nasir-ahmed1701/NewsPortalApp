import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AlertNotificationConfig,
  AlertNotificationTypeEnum,
} from '../../models/alert-notification-config';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-alert-notification',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './alert-notification.component.html',
  styleUrl: './alert-notification.component.css',
})
export class AlertNotificationComponent {
  @Input() config?: AlertNotificationConfig;
  alertNotificationTypeEnum = AlertNotificationTypeEnum;

  public alertClassName: string = '';
  constructor() {}

  close() {
    this.config!.show = false;
  }
}
