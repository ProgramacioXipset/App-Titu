import { Component } from '@angular/core';
import { XoferService } from 'src/app/servicios/xofer.service';

@Component({
  selector: 'app-taula-principal',
  templateUrl: './taula-principal.component.html',
  styleUrls: ['./taula-principal.component.css']
})
export class TaulaPrincipalComponent {
  xofers: any = null;

  constructor(private xoferService:XoferService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.xoferService.retornarXofer()
      .subscribe( (result: any) => {this.xofers = result;})
  }

}
