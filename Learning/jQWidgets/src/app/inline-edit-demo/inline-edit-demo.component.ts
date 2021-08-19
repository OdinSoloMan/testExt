import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-inline-edit-demo',
  templateUrl: './inline-edit-demo.component.html',
  styleUrls: ['./inline-edit-demo.component.scss']
})
export class InlineEditDemoComponent implements OnInit {
  data: any = [
    {
      "id_Product": "4411fa3b-078c-4725-18b8-08d950244ae1",
      "name": "2344444444456",
      "description": "nvarchar(max)",
      "orders": []
    },
    {
      "id_Product": "4421fa3b-078c-4725-18b8-08d950244ae1",
      "name": "1234444444564",
      "description": "nvarchar(max)",
      "orders": []
    },
    {
      "id_Product": "784664b3-24f4-46c8-18b9-08d950244ae1",
      "name": "test1",
      "description": "Description1",
      "orders": []
    },
    {
      "id_Product": "41ae182a-a2d5-4ddb-18ba-08d950244ae1",
      "name": "test2",
      "description": "Description2",
      "orders": []
    },
    {
      "id_Product": "072d0b2a-7bec-4108-18bb-08d950244ae1",
      "name": "test3",
      "description": "Description3",
      "orders": []
    }
  ];

  selected = [];

  @ViewChild('table') table!: DatatableComponent;
  rows: any = [];
  isEditable: any = {};

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.rows = this.data;
  }


  // Open/close panel  
  toggleExpandRow(row: any, expanded: any) {
    this.table.rowDetail.toggleExpandRow(row);
    if (!expanded) {
      this.table.rowDetail.collapseAllRows();
      this.table.rowDetail.toggleExpandRow(row);
    }
    else if (expanded) {
      this.table.rowDetail.collapseAllRows();
    }
  }

  // Save row
  save(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row saved: " + rowIndex);
    console.log(this.data[rowIndex])
    //    var s = (<HTMLInputElement>document.getElementById("desc-"+rowIndex))?.value;
    var id = this.data[rowIndex].id_Product
    let s = {
      id_Product: id,
      name: (<HTMLInputElement>document.getElementById("name-" + id))?.value,
      description: (<HTMLInputElement>document.getElementById("description-" + id))?.value
    };

    this.api.updateProduct(s).subscribe(
      res => {
        console.log("res", res);
        console.log("this.data[rowIndex]", this.data[rowIndex]);
        this.data[rowIndex] = res;
        console.log("this.data[rowIndex] update", this.data[rowIndex]);
      },
      err => {
        this.data[rowIndex].id;
        (<HTMLInputElement>document.getElementById("name-" + id)).value = this.data[rowIndex].name;
        (<HTMLInputElement>document.getElementById("description-" + id)).value = this.data[rowIndex].description;
        console.log("err", err);
      }
    )

    console.log(s)
  }

  // Delete row
  delete(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row deleted: " + rowIndex);
  }
  // editing: any = {};
  // rows: any = [];

  // ColumnMode = ColumnMode;

  // constructor() {
  //   this.rows = [
  //     {
  //       "id_Product": "4411fa3b-078c-4725-18b8-08d950244ae1",
  //       "name": "2344444444456",
  //       "description": "nvarchar(max)",
  //       "orders": []
  //     },
  //     {
  //       "id_Product": "4421fa3b-078c-4725-18b8-08d950244ae1",
  //       "name": "1234444444564",
  //       "description": "nvarchar(max)",
  //       "orders": []
  //     },
  //     {
  //       "id_Product": "784664b3-24f4-46c8-18b9-08d950244ae1",
  //       "name": "test1",
  //       "description": "Description1",
  //       "orders": []
  //     },
  //     {
  //       "id_Product": "41ae182a-a2d5-4ddb-18ba-08d950244ae1",
  //       "name": "test2",
  //       "description": "Description2",
  //       "orders": []
  //     },
  //     {
  //       "id_Product": "072d0b2a-7bec-4108-18bb-08d950244ae1",
  //       "name": "test3",
  //       "description": "Description3",
  //       "orders": []
  //     }
  //   ]
  // }

  // ngOnInit(): void {
  // }

  // updateValue(event: any, cell: any, rowIndex: any) {
  //   console.log('inline editing rowIndex', rowIndex);
  //   console.log('inline cell rowIndex', cell);
  //   console.log('inline event rowIndex', event);
  //   this.editing[rowIndex + '-' + cell] = false;
  //   this.rows[rowIndex][cell] = event.target.value;
  //   this.rows = [...this.rows];
  //   console.log('UPDATED!', this.rows[rowIndex][cell]);
  // }
}
