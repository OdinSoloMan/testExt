import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-ngxchart',
  templateUrl: './ngxchart.component.html',
  styleUrls: ['./ngxchart.component.scss']
})
export class NgxchartComponent implements OnInit {
  multi: any[] = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'London';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'C*';
  legendTitle: string = 'Temperature';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private api: ApiService,
  ) {
    //Object.assign(this, { multi })
  }
  ngOnInit(): void {
    this.getData();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getData() {
    this.api.getDataWeather().subscribe(res => {
      console.log(res);
      let data = res.list.map((u: { dt_txt: any; main: { temp_min: any; temp_max: any; }; }) => ({ name: u.dt_txt, series: [{ name: "min", value: u.main.temp_min }, { name: "max", "value": u.main.temp_max }] }));
      this.multi = data.slice(0, 5);
    })
  }
}
