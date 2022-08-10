import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../interfaces/confirm-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    debugger;
    return this.dialog
      .open(ConfirmDialogComponent, {
        data,
        width: '400px',
        disableClose: true,
      }).afterClosed();
  }
}
