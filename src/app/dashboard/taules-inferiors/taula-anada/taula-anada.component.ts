import { Component } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';

@Component({
  selector: 'app-taula-anada',
  templateUrl: './taula-anada.component.html',
  styleUrls: ['./taula-anada.component.css']
})
export class TaulaAnadaComponent {
  anades: any = null;

  constructor(private anadaService:AnadaService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.anadaService.retornarAnada()
      .subscribe( (result: any) => {this.anades = result;})
  }
}
