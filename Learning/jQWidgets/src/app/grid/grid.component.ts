import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {
  @ViewChild('myGrid') myGrid!: jqxGridComponent;

  constructor(
    private dataService: ApiService
  ) { }

  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();
  }

  source: any = {
    localdata: null,
    datafields: [
      { name: 'name', type: 'string' },
      { name: 'barcode', type: 'string' },
      { name: 'description', type: 'int' },
      { name: 'buyingPrice', type: 'string' },
      { name: 'rate', type: 'string' }
    ],
    datatype: 'json'
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: 'Name', datafield: 'name', width: 250 },
    { text: 'Barcode', datafield: 'barcode', width: 250 },
    { text: 'Description', datafield: 'description', width: 180 },
    { text: 'Buying Price', datafield: 'buyingPrice', width: 120 },
    { text: 'Rate', datafield: 'rate', minwidth: 120 }
  ];

  getData() {
    this.dataService.getListProducts()
      .subscribe((data) => {
        this.source.localdata = data;
        this.myGrid.updatebounddata();
      });
  };

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 1000;
  }
}
