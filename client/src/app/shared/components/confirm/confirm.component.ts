import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertType } from '../alert/alert.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalConfirmData
  ) {}
}

export class ModalConfirmData {
  title: string;
  message: string;
  confirmButtonLabel: string;
  closeButtonLabel: string;

  constructor(data?) {
    if (data) {
      this.title = data.title;
      this.message = data.message;
      this.confirmButtonLabel = data.confirmButtonLabel;
      this.closeButtonLabel = data.closeButtonLabel;
    }
  }
}
