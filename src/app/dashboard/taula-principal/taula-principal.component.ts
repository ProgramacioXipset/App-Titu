import { Component } from '@angular/core';
import { XoferService } from 'src/app/servicios/xofer.service';
import { PopupModificarXoferComponent } from '../popup-modificar-xofer/popup-modificar-xofer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-taula-principal',
  templateUrl: './taula-principal.component.html',
  styleUrls: ['./taula-principal.component.css']
})
export class TaulaPrincipalComponent {
  xofers: any = null;
  dialogOpen = false;
  selectedXofer: any;

  constructor(private xoferService:XoferService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.xoferService.retornarXofer()
      .subscribe( (result: any) => {this.xofers = result;})
  }

  openDialog(xofer: any) {
    this.selectedXofer = xofer;
    this.dialogOpen = true;

    console.log(this.selectedXofer.nom);
    

    const dialogRef = this.dialog.open(PopupModificarXoferComponent, {
      data: { xofer: this.selectedXofer },
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Realiza acciones después de que se cierre el diálogo si es necesario
      this.dialogOpen = false;
    });
  }
}
