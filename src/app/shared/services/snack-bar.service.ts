import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string, messageType: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [messageType];
    this.snackBar.open(message, action, config);
  }
}
