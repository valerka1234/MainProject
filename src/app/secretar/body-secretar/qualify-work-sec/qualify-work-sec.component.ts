import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ComissionService } from '../../../json/comission.service';
import { StudentsService } from '../../../json/students.service';
import { AppServiceService } from '../../../app-service.service';

@Component({
  selector: 'app-qualify-work-sec',
  templateUrl: './qualify-work-sec.component.html',
  styleUrls: ['./qualify-work-sec.component.scss', '../menu/style.menu.scss']
})

export class QualifyWorkSecComponent implements OnInit {

  groups: any;
  comissions: any;
  students: any;

  date: any;
  group_list: any;
  comission_list: any;
  students_list: any;

  group: { code: string, group: string, date_qual: [any] };
  root: string;

  constructor(
    private comissionService: ComissionService,
    private studentsService: StudentsService,
    private appService: AppServiceService
  ) { }

  ngOnInit() {
    this.date = moment(new Date()).format('YYYY-MM-DD');
    this.root = 'm';
    // this.comissions = this.comissionService.comission;
    this.students = this.studentsService.students_qualify_work;
    this.appService.GetGroupsDate(this.date)
      .subscribe(res => {
        this.groups = res;
        this.GetGroups();
      });
  }

  SetRoot(root: string) {
    this.root = root;
  }

  GetGroups() {
    this.group_list = [];
    this.group = { code: '000', group: 'Группа не указана', date_qual: null};
    this.group_list = this.groups.filter(group => group.date_exam.includes(this.date) === true).sort(this.SortByGroup);
    if (this.group_list.length > 0) {
      this.group = { code: this.group_list[0].code, group: this.group_list[0].group, date_qual: this.group_list[0].date_qualify_work };
    }
    this.GetComission();
  }

  SortByGroup(a, b) {
    if (a.group < b.group) {
      return -1;
    }
    if (a.group > b.group) {
      return 1;
    }
    return 0;
  }

  SetGroup(selectedValue: any) {
    this.group = {
      code: selectedValue.target.selectedOptions[0].value,
      group: selectedValue.target.selectedOptions[0].text,
      date_qual: selectedValue.target.selectedOptions[0].date_qualify_work
    };
    this.GetComission();
  }

  GetComission() {
    this.comission_list = [];
    if (this.group.code !== '000') {
      this.comission_list = this.comissions.filter(value => {
        return value.groups.findIndex(group => group.code === this.group.code && group.role === 'k') !== -1;
      }).map(
        comission => {
          return {
            code: comission.code,
            fio: comission.fio,
            group_code: this.group.code,
            status: false
          };
        }
      );
    }
    this.GetStudents();
  }

  GetStudents() {
    this.students_list = this.students.filter(student => {
      return student.group_code === this.group.code;
    }).map(student => {
      return {
        code: student.code,
        fio: student.fio,
        group_code: student.group_code,
        work_name: student.work_name,
        result_rate: student.result_rating,
        comissions: student.comissions
      };
    });
  }
}
