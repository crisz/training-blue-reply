import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.scss'
})


export class DialogModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
