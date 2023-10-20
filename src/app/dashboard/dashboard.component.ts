import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataAvuiFormatejada: string;
  dataDemaFormatejada: string;
  dataAvuiFormatejada2: string;
  dataDemaFormatejada2: string;

  constructor(private dateService: DateService) {
    this.dataAvuiFormatejada = this.dateService.dataAvui.getDate() + "/" + (this.dateService.dataAvui.getMonth() + 1) + "/" + this.dateService.dataAvui.getFullYear();
    this.dataDemaFormatejada = this.dateService.dataDema.getDate() + "/" + (this.dateService.dataDema.getMonth() + 1) + "/" + this.dateService.dataDema.getFullYear();
    this.dataAvuiFormatejada2 = this.dateService.dataAvui.getFullYear() + "-" + (this.dateService.dataAvui.getMonth() + 1).toString().padStart(2, '0') + "-" + this.dateService.dataAvui.getDate().toString().padStart(2, '0');
    this.dataDemaFormatejada2 = this.dateService.dataDema.getFullYear() + "-" + (this.dateService.dataDema.getMonth() + 1).toString().padStart(2, '0') + "-" + this.dateService.dataDema.getDate().toString().padStart(2, '0');
  }

  ngOnInit() {
    this.dateService.currentDate$.subscribe(date => {
      this.dataAvuiFormatejada = this.formatDate(date);
      this.dataDemaFormatejada = this.formatDate(this.dateService.dataDema);
      this.dataAvuiFormatejada2 = this.formatDate2(date);
      this.dataDemaFormatejada2 = this.formatDate2(this.dateService.dataDema);
    });
  }

  private formatDate(date: Date): string {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear()
    );
  }

  private formatDate2(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añade 0 si es necesario
    const day = date.getDate().toString().padStart(2, '0'); // Añade 0 si es necesario

    return `${year}-${month}-${day}`;
  }
}
