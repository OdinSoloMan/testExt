import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { jqxChartComponent } from "jqwidgets-ng/jqxchart";
 
@Component({
    selector: "app-test",
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
 
export class TestComponent implements OnInit {

    ngOnInit(): void { }

    data: any[] = [
        { 'time': '"2021-08-18 09:00:00"', 'min': -1.9, 'max': 3.7, 'avg': 0.2 },
        { 'time': '"2021-08-18 09:00:01"', 'min': -0.9, 'max': 5.9, 'avg': 1.1 },
        { 'time': '"2021-08-18 09:00:02"', 'min': 0.8, 'max': 9.8, 'avg': 4.9 },
        { 'time': '"2021-08-18 09:00:03"', 'min': 4.1, 'max': 13.9, 'avg': 8.7 },
        { 'time': '"2021-08-18 09:00:04"', 'min': 8.0, 'max': 18.4, 'avg': 13.1 },
        { 'time': '"2021-08-18 09:00:05"', 'min': 11.3, 'max': 22.2, 'avg': 16.6 },
        { 'time': '"2021-08-18 09:00:06"', 'min': 13.3, 'max': 25.3, 'avg': 18.4 },
        { 'time': '"2021-08-18 09:00:07"', 'min': 13.0, 'max': 24.4, 'avg': 17.6 },
        { 'time': '"2021-08-18 09:00:08"', 'min': 10.3, 'max': 20.8, 'avg': 14.3 },
        { 'time': '"2021-08-18 09:00:09"', 'min': 6.6, 'max': 14.9, 'avg': 9.2 },
        { 'time': '"2021-08-18 09:00:10"', 'min': 2.1, 'max': 8.4, 'avg': 4.2 },
        { 'time': '"2021-08-18 09:00:11"', 'min': -0.5, 'max': 4.5, 'avg': 1.5 }
    ];
    toolTipCustomFormatFn = (value: any, itemIndex: any, serie: any, group: any, categoryValue: any, categoryAxis: any): string => {
        let dataItem =this.data[itemIndex];
        return '<DIV style="text-align:left"><b>time: ' +
            categoryValue + '</b><br />Min: ' +
            dataItem.min + '°<br />Max: ' +
            dataItem.max + '°<br />Average: ' +
            dataItem.avg + '°</DIV>';
    };
	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}
	
    padding = { left: 5, top: 5, right: 5, bottom: 5 };
    titlePadding = { left: 90, top: 0, right: 0, bottom: 10 };
    xAxis =
    {
        dataField: 'time',
        unitInterval: 1,
        gridLines: {
            step: 3
        }
    };
    valueAxis =
    {
        minValue: -5,
        maxValue: 30,
        unitInterval: 5,
        title: { text: 'Temperature [C]<br>' },
        labels: {
            horizontalAlignment: 'right',
            formatSettings: { sufix: '°' }
        }
    };
    seriesGroups =
    [
        {
            type: 'rangecolumn',
            columnsGapPercent: 50,
            toolTipFormatFunction: this.toolTipCustomFormatFn,
            series: [
                { dataFieldTo: 'max', displayText: 'Temperature Range', dataFieldFrom: 'min', opacity: 1 }
            ]
        },
        {
            type: 'spline',
            toolTipFormatFunction: this.toolTipCustomFormatFn,
            series: [
                { dataField: 'avg', displayText: 'Average Temperature', opacity: 1, lineWidth: 2 }
            ]
        }
    ];
}