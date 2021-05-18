import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalAlertData
  ) {}

  getAlertIcon() {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return 'done';
      case AlertType.WARNING:
        return 'info';
      case AlertType.ERROR:
        return 'warning';
    }
  }
}

export class ModalAlertData {
  title: string;
  message: string;
  alertType: AlertType;
  closeButtonLabel: string;

  constructor(data?) {
    if (data) {
      this.title = data.title;
      this.message = data.message;
      this.alertType = data.alertType;
      this.closeButtonLabel = data.closeButtonLabel;
    }
  }
}

export enum AlertType {
  INFO,
  WARNING,
  ERROR
}
