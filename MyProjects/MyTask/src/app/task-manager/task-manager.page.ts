import { Component, OnInit } from '@angular/core';
import { map, timeout } from 'rxjs/operators';
import { TaskManagerService } from '../service/task-manager.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.page.html',
  styleUrls: ['./task-manager.page.scss'],
})
export class TaskManagerPage implements OnInit {
  dayWeek: any = [
    { key: 'Monday', name: 'MONDAY', data: [] },
    { key: 'Tuesday', name: 'TUESDAY', data: [] },
    { key: 'Wednesday', name: 'WEDNESDAY', data: [] },
    { key: 'Thursday', name: 'THURSDAY', data: [] },
    { key: 'Friday', name: 'FRIDAY', data: [] },
    { key: 'Saturday', name: 'SATURDAY', data: [] },
    { key: 'Sunday', name: 'SUNDAY', data: [] },
  ];

  listTaskDay: any;

  constructor(private taskManager: TaskManagerService) {}

  ngOnInit() {
    this.taskManager
      .getAll()
      .snapshotChanges()
      .pipe(
        timeout(60000),
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(
        (data) => {
          /////

          this.switchData(data);
          console.log(this.dayWeek);
        },
        (err) => {}
      );
  }

  onWorkingDay() {
    this.taskManager.create({name: 'test', description: 'Descripion test', time: 'time'}, 'Friday');
  }

  switchData(data) {
    this.listTaskDay = data;
    console.log('this.listTaskDay', this.listTaskDay);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      switch (data[i].key) {
        case 'Monday': {
          this.parseData(i, 0, 'Monday');
          break;
        }
        case 'Tuesday': {
          this.parseData(i, 1, 'Tuesday');
          console.log('Tuesday');
          break;
        }
        case 'Wednesday': {
          this.parseData(i, 2, 'Wednesday');
          console.log('Wednesday');
          break;
        }
        case 'Thursday': {
          this.parseData(i, 3, 'Thursday');
          console.log('Thursday');
          break;
        }
        case 'Friday': {
          this.parseData(i, 4, 'Friday');
          console.log('Friday');
          break;
        }
        case 'Saturday': {
          this.parseData(i, 5, 'Saturday');
          console.log('Saturday');
          break;
        }
        case 'Sunday': {
          this.parseData(i, 6, 'Sunday');
          console.log('Sunday');
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    }
  }

  parseData(i: number, indexDay: number, nameDay: string) {
    delete this.listTaskDay[i]['key'];
    console.log(nameDay);
    console.log(`Delete ${nameDay} key`, this.listTaskDay[i]);
    var key = Object.keys(this.listTaskDay[i]);
    console.log('key info data', key[0]);
    let keys = key[0];
    var info = this.listTaskDay[i][keys];
    console.log('Info', info);

    var newObject = {
      key: key[0],
      name: info.name,
      description: info.description,
      time: info.time,
    };
    console.log(newObject);

    this.dayWeek[indexDay].data.push(newObject);

    this.dayWeek = [...this.dayWeek];
  }
}
