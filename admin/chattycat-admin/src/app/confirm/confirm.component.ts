import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { KalDialogService } from '@kalidea/kaligraphi';
import { tap } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {

  @Input() title: string;
  @Output() readonly accepted = new EventEmitter<boolean>();

  constructor(private readonly dialogService: KalDialogService) { }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogService.open<ConfirmDialogComponent, ConfirmDialogData>(
      ConfirmDialogComponent,
      {
        maxWidth: '450px',
        hasBackdrop: true,
        data: {
          title: this.title
        }
      }).afterClosed
      .pipe(
        tap(response => {
          if (response?.response) {
            this.accepted.emit(true);
          }
        })
      )
      .subscribe();
  }
}
