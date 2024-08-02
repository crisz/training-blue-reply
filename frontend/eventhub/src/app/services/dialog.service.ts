import { inject, Injectable } from "@angular/core";
import { DialogData, DialogModalComponent } from "../modal/dialog-modal/dialog-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

    readonly dialog = inject(MatDialog);
    private dialogData: DialogData = {title :'',subtitle:''};

  constructor() { }

  openDialogMessage(title:string,subtible:string){
    this.dialogData.title = title;
    this.dialogData.subtitle = subtible;
    this.dialog.open(DialogModalComponent, {
        data: this.dialogData
      });
  }
}
