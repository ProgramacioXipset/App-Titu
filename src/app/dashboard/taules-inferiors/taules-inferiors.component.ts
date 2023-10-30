import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taules-inferiors',
  templateUrl: './taules-inferiors.component.html',
  styleUrls: ['./taules-inferiors.component.css']
})
export class TaulesInferiorsComponent {
  @Input() fecha: string = "";
}
