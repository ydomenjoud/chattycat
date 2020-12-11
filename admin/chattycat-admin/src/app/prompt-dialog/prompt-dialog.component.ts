import { Component, Inject, OnInit } from '@angular/core';
import { KAL_DIALOG_DATA, KalDialogRef } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.sass']
})
export class PromptDialogComponent implements OnInit {

  response = '';

  constructor(private dialogRef: KalDialogRef<PromptDialogComponent>,) {
  }

  submit() {
    this.dialogRef.close(this.response);
  }

  ngOnInit(): void {
  }

}
