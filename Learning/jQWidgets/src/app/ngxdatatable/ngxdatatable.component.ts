import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiService } from '../service/api.service';
import { timeout } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ngxdatatable',
  templateUrl: './ngxdatatable.component.html',
  styleUrls: ['./ngxdatatable.component.scss']
})
export class NgxdatatableComponent implements OnInit {
  @ViewChild('table') table!: DatatableComponent;

  title = 'angular-datatables';
  itemsPerPage: number = 5;
  filter: string = '';
  totalPassengers: number = 0;
  ColumnMode = ColumnMode;
  rows: any = [];
  loading: boolean = false;
  isEditable: any = {};
  page: any;
  modalRef!: BsModalRef;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
  })

  constructor(
    private api: ApiService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
    this.page = pageInfo;
    this.api.getPageProducts(pageInfo.offset + 1, this.itemsPerPage, this.filter).subscribe(
      res => {
        this.rows = res.data
        this.totalPassengers = res.totalPassengers
      }
    )
  }

  async updateFilter(event: any) {
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

  onSort(event: any) {
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

  // Save row
  save(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row saved: " + rowIndex);
    console.log(this.rows[rowIndex])
    //    var s = (<HTMLInputElement>document.getElementById("desc-"+rowIndex))?.value;
    var id = this.rows[rowIndex].id_Product
    let s = {
      id_Product: id,
      name: (<HTMLInputElement>document.getElementById("name-" + id))?.value,
      description: (<HTMLInputElement>document.getElementById("description-" + id))?.value
    };

    this.api.updateProduct(s).subscribe(
      res => {
        console.log("res", res);
        console.log("this.data[rowIndex]", this.rows[rowIndex]);
        this.rows[rowIndex] = res;
        console.log("this.data[rowIndex] update", this.rows[rowIndex]);
      },
      err => {
        this.rows[rowIndex].id;
        (<HTMLInputElement>document.getElementById("name-" + id)).value = this.rows[rowIndex].name;
        (<HTMLInputElement>document.getElementById("description-" + id)).value = this.rows[rowIndex].description;
        console.log("err", err);
      }
    )
    console.log(s)
  }

  // Delete row
  deletes(row: any, rowIndex: any) {
    //this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row deleted: " + rowIndex);
    var data = this.rows[rowIndex].id_Product;
    this.api.deleteProduct(data).subscribe(
      res => {
        this.setPage(this.page);
      },
      err => {

      }
    )
  }

  back(row: any, rowIndex: any) {
    let id: any = this.rows[rowIndex].id_Product;
    (<HTMLInputElement>document.getElementById("name-" + id)).value = this.rows[rowIndex].name;
    (<HTMLInputElement>document.getElementById("description-" + id)).value = this.rows[rowIndex].description;
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
  }

  addProduct() {
    console.log(this.form.value)
    this.api.addProduct(this.form.value).subscribe(
      res => {
        alert("true");
        this.modalRef.hide()
        this.form.reset();
      },
      error => {
        alert("Error")
      }
    )
  }
}
