import { Component } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';

@Component({
  selector: 'app-taula-tornada',
  templateUrl: './taula-tornada.component.html',
  styleUrls: ['./taula-tornada.component.css']
})
export class TaulaTornadaComponent {
  tornades: any = null;

  constructor(private anadaService:AnadaService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.anadaService.retornarTornada()
      .subscribe( (result: any) => {this.tornades = result;})
  }
}
