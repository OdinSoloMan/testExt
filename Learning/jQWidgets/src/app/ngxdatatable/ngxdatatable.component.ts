import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ApiService } from '../service/api.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-ngxdatatable',
  templateUrl: './ngxdatatable.component.html',
  styleUrls: ['./ngxdatatable.component.scss']
})
export class NgxdatatableComponent implements OnInit {
  title = 'angular-datatables';
  itemsPerPage: number = 5;
  filter: string = '';
  totalPassengers : number = 0;
  ColumnMode = ColumnMode;
  rows:any = [];
  loading: boolean = false;

  constructor(
    private api : ApiService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getPageProducts(0, this.itemsPerPage, this.filter).subscribe(
      res => {
        this.rows = res.data
        this.totalPassengers = res.totalPassengers
      }
    )
  }

  setPage(pageInfo: { offset: any; }) {
    console.log(pageInfo.offset);
    this.api.getPageProducts(pageInfo.offset + 1, this.itemsPerPage, this.filter).subscribe(
      res => {
        this.rows = res.data
        this.totalPassengers = res.totalPassengers
      }
    )
  }
  async updateFilter(event:any){
    console.log(event.target.value)
    this.filter = event.target.value;
    this.api.getPageProducts(0, this.itemsPerPage, this.filter)
    .pipe(timeout(6000))
    .subscribe(
      async (response) => {
        console.log(typeof (response), response)
        this.rows = response.data;
        this.totalPassengers = response.totalPassengers;
      },
      async (error) => {
        console.log(error)
      }
    )
  }

  onSort(event : any) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }
}
