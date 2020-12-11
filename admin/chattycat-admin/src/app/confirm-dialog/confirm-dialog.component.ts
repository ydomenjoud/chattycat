import { Component, Inject } from '@angular/core';
import { KAL_DIALOG_DATA, KalDialogRef } from '@kalidea/kaligraphi';

export interface ConfirmDialogData {
  title: string;
  response?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent {

  constructor(private dialogRef: KalDialogRef<ConfirmDialogComponent>,
              @Inject(KAL_DIALOG_DATA) public data: ConfirmDialogData) {
  }

  accept() {
    this.data.response = true;
    this.dialogRef.close(this.data);
  }

  refuse() {
    this.data.response = false;
    this.dialogRef.close();
  }
}
