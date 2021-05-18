import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  AlertComponent,
  ModalAlertData,
  AlertType
} from '../../../shared/components/alert/alert.component';
import {
  ConfirmComponent,
  ModalConfirmData
} from '../../../shared/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public dialog: MatDialog) {}

  modalIsOpening;
  openAlertModal(title: string, message: string, alertType: AlertType) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '300px',
      autoFocus: false,
      data: new ModalAlertData({
        title: title,
        message: message,
        alertType: alertType
      })
    });

    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, 3000);
    });
  }

  openInfoModal(title: string, message: string) {
    this.openAlertModal(title, message, AlertType.INFO);
  }

  openWarningModal(title: string, message: string) {
    this.openAlertModal(title, message, AlertType.WARNING);
  }

  openErrorModal(title: string, message: string) {
    this.openAlertModal(title, message, AlertType.ERROR);
  }

  openConfirmModal(
    confirmTitle: string,
    confirmMessage: string,
    confirmBtn: string,
    closeBtn: string,
    callBackFunction: Function
  ) {
    if (this.modalIsOpening) return;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: new ModalConfirmData({
        title: confirmTitle,
        message: confirmMessage,
        confirmButtonLabel: confirmBtn,
        closeButtonLabel: closeBtn
      })
    });
    this.modalIsOpening = true;

    dialogRef.afterClosed().subscribe((result) => {
      callBackFunction(result);
      this.modalIsOpening = false;
    });
  }
}
