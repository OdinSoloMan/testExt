import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @ViewChild('myChart') myChart!: jqxChartComponent;

  constructor(
    private dataService: ApiService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  source: any = {    
    localdata: null,
    datafields: [
      { name: 'index' },
      { name: 'min' },
      { name: 'max' },
    ],    
    datatype: 'json',
  };

  xAxis: any = {
    dataField: 'index',
    displayText: 'Index',
    unitInterval: 1,
    gridLines: { interval: 3 }
  };

  valueAxis: any = {
    unitInterval: 5,
    title: {
      visible: true,
      text: 'Temperature [C]<br>'
    },
    labels: {
      formatSettings: {
        decimalPlaces: 1,
        negativeWithBrackets: false
      },
      horizontalAlignment: 'right'
    }
  };

  seriesGroups: any[] = [
    {
      type: 'column',
      series: [
        { dataField: 'max', displayText: 'Max Temperature' },
        { dataField: 'min', displayText: 'Min Temperature' }
      ]
    }
  ];

  dataAdapter: any;

  padding: any = { left: 10, top: 5, right: 10, bottom: 5 };
  titlePadding: any = { left: 50, top: 0, right: 0, bottom: 10 };

  getData() {
    this.dataService.getDataWeather().subscribe((data) => {
      let i = 0; 
      this.source.localdata = data.list.map((u: { main: { temp_min: any; temp_max: any; }; }) => ({ index: i++, min: u.main.temp_min, max: u.main.temp_max}));
      console.log(data.list.map((u: { main: { temp_min: any; temp_max: any; }; }) => ({ index: i++, min: u.main.temp_min, max: u.main.temp_max})));
      this.dataAdapter = new jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.url + '" : ' + error); } });   ;
   })
  }

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }
}