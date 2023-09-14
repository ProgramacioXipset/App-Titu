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

  constructor(private dateService: DateService) {
    this.dataAvuiFormatejada = this.dateService.dataAvui.getDate() + "/" + (this.dateService.dataAvui.getMonth() + 1) + "/" + this.dateService.dataAvui.getFullYear();
    this.dataDemaFormatejada = this.dateService.dataDema.getDate() + "/" + (this.dateService.dataDema.getMonth() + 1) + "/" + this.dateService.dataDema.getFullYear();
  }

  ngOnInit() {
    this.dateService.currentDate$.subscribe(date => {
      this.dataAvuiFormatejada = this.formatDate(date);
      this.dataDemaFormatejada = this.formatDate(this.dateService.dataDema);
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
}
