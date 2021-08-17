import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: jqxChartComponent;

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'month' },
      { name: 'min' },
      { name: 'max' },
    ],
    localdata: null,
  };

  xAxis: any = {
    dataField: 'month',
    displayText: 'Month',
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


  constructor(
    private dataService: ApiService,
  ) { }

  ngAfterViewInit() {
    this.getData()
  }

  getData() {
    this.source.localdata = [
      {
        "month": "Jan",
        "min": -1.9,
        "max": 3.7
      },
      {
        "month": "Feb",
        "min": -0.9,
        "max": 5.9
      },
      {
        "month": "Mar",
        "min": 0.8,
        "max": 9.8
      },
      {
        "month": "Apr",
        "min": 4.1,
        "max": 13.9
      },
      {
        "month": "May",
        "min": 8,
        "max": 18.4
      },
      {
        "month": "Jun",
        "min": 11.3,
        "max": 22.2
      },
      {
        "month": "Jul",
        "min": 13.3,
        "max": 25.3
      },
      {
        "month": "Aug",
        "min": 13,
        "max": 24.4
      },
      {
        "month": "Sep",
        "min": 10.3,
        "max": 20.8
      },
      {
        "month": "Oct",
        "min": 6.6,
        "max": 14.9
      },
      {
        "month": "Nov",
        "min": 2.1,
        "max": 8.4
      },
      {
        "month": "Dec",
        "min": -0.5,
        "max": 4.5
      }
    ]
    console.log(this.source.localdata)
    this.myChart.update();
  }

  dataAdapter: any = new jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.url + '" : ' + error); } });
  
  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
  
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }


}