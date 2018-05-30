import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppServiceService } from '../../../../app-service.service';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-exam-sec-evaluation',
  templateUrl: './exam-sec-evaluation.component.html',
  styleUrls: ['./exam-sec-evaluation.component.scss', '../exam-sec.component.scss']
})
export class ExamSecEvaluationComponent implements OnInit, OnChanges {

  @Input() students: any;
  @Input() group: any;
  @Input() comission_list: [{ code: number, pred: boolean, fio: string, group_code: number, status: boolean }];

  comissions: any;
  comissions_check: any;
  comission_person: { code: number, fio: string, group_code: number, status: boolean };

  students_list: [ any ];
  students_rate: any;
  students_local: any;
  student_info: any;

  sum: number;
  count: any;
  first: number;
  second: number;
  third: number;
  comission: string;

  result: any;
  direction: any;

  faculties: any;
  directions: any;
  profiles: any;

  info: {
    group: string,
    direction_code: string,
    direction_name: string,
    faculty: string,
    date: any,
    comissions: [
      {
        fio: string,
        students: [
          {
            index: string,
            fio: string,
            ticket: string,
            first: string,
            second: string,
            third: string,
            avg: string,
            result: string
          }
        ]
      }
    ]
  };

  constructor(
    private appService: AppServiceService
  ) { }

  ngOnInit() {
    this.FilterComission();
    this.comission_person = {
      code: 0,
      fio: null,
      group_code: null,
      status: false
    };
    this.result = {
      status: 'false',
      body: ''
    };

    this.appService.GetFaculties()
      .subscribe(res => {
        this.faculties = res;
      });

    this.appService.GetDirections()
      .subscribe(res => {
        this.directions = res;
      });

    this.appService.GetProfiles()
      .subscribe(res => {
        this.profiles = res;
      });

    this.GetStudents();
  }

  ngOnChanges() {
    this.FilterComission();
    this.comission_person = {
      code: 0,
      fio: null,
      group_code: null,
      status: false
    };
    this.faculties = [
      {
        id: null,
        value: '',
        directions: null
      }
    ];
    this.result = {
      status: 'false',
      body: ''
    };

    this.appService.GetFaculties()
      .subscribe(res => {
        this.faculties = res;
      });

    this.appService.GetDirections()
      .subscribe(res => {
        this.directions = res;
      });

    this.appService.GetProfiles()
      .subscribe(res => {
        this.profiles = res;
      });

    this.appService.GetGroupsCode(this.group.code)
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.length > 0) {
          this.group = result[0];
        }
      });

    this.GetStudents();
  }

  GetStudents() {
    this.students_rate = [];
    if ( isNullOrUndefined(this.students) !== true ) {
      if ( isNullOrUndefined(this.group.code) !== true ) {
        this.appService.GetStudentsRate(this.group.code)
          .subscribe(response => {
            this.students_rate = response;
            this.SetStudents();
          });
      }
    }
  }

  SetStudents() {
    this.students_local = [];
    if ( isNullOrUndefined(this.students_rate) !== true ) {
      this.students_local = this.students.map(student => {

        this.first = null;
        if ( this.students_rate.findIndex(stud => stud.id === student.code) !== -1 ) {
          if ( this.students_rate.find(stud => stud.id === student.code).gradings.findIndex(rate => rate.question === '1' ) !== -1) {
            this.first = this.students_rate.find(stud => stud.id === student.code).gradings.find(rate => rate.question === '1' ).result;
          }
        }

        this.second = null;
        if ( this.students_rate.findIndex(stud => stud.id === student.code) !== -1 ) {
          if ( this.students_rate.find(stud => stud.id === student.code).gradings.findIndex(rate => rate.question === '2' ) !== -1 ) {
            this.second = this.students_rate.find(stud => stud.id === student.code).gradings.find(rate => rate.question === '2' ).result;
          }
        }

        this.third = null;
        if ( this.students_rate.findIndex(stud => stud.id === student.code) !== -1 ) {
          if ( this.students_rate.find(stud => stud.id === student.code).gradings.findIndex(rate => rate.question === '3' ) !== -1 ) {
            this.third = this.students_rate.find(stud => stud.id === student.code).gradings.find(rate => rate.question === '3' ).result;
          }
        }

        this.comission = null;
        if ( this.students_rate.findIndex(stud => stud.id === student.code) !== -1 ) {
          this.comission = this.students_rate.find(stud => stud.id === student.code).gradings[0].comission.member.fio;
        }

        return {
          code: student.code,
          fio: student.fio,
          first: this.first,
          second: this.second,
          third: this.third,
          comission: this.comission,
          result: student.result
        };
      });
    }
  }

  CheckComission(person) {
    this.result = {
      status: 'false',
      body: ''
    };
    this.comission_list.find(comission => comission.code === person.code).status = true;
    this.FilterComission();
  }

  UnCheckComission(person) {
    this.result = {
      status: 'false',
      body: ''
    };
    this.comission_list.find(comission => comission.code === person.code).status = false;
    this.FilterComission();
  }

  FilterComission() {
    this.comissions = this.comission_list.filter(comission => comission.status === false);
    this.comissions_check = this.comission_list.filter(comission => comission.status === true);
  }

  ShowRating(person) {
    this.result = {
      status: 'false',
      body: ''
    };
    this.comission_person = person;
    this.students_list = this.students_local
      .map(
        student => {
          this.student_info = {};
          if ( !this.comission_person.fio.includes(student.comission) ) {
            this.student_info = {
              ticket: '',
              first: '',
              second: '',
              third: '',
              avg: '',
              result: ''
            };
          } else {
            this.sum = 0;
            this.count = null;
            this.sum = [student.first, student.second, student.third]
              .reduce((a, b) => a + b, 0);
            if (this.sum !== 0) {
              this.count = [student.first, student.second, student.third]
                .filter(elem => isNullOrUndefined(elem) === false);
              this.student_info.avg = Number(this.sum / this.count.length).toFixed(0);
            } else {
              this.student_info.avg = '';
            }
            this.student_info.first = isNullOrUndefined(student.first) ? '' : student.first;
            this.student_info.second = isNullOrUndefined(student.second) ? '' : student.second;
            this.student_info.third = isNullOrUndefined(student.third) ? '' : student.third;
            this.student_info.result = isNullOrUndefined(student.result) ? '' : student.result;
            this.student_info.ticket = isNullOrUndefined(this.students.find(stud => stud.code === student.code).ticket)
              ? ''
              : this.students.find(stud => stud.code === student.code).ticket;
          }
        return {
          index: '',
          fio: student.fio,
          ticket: this.student_info.ticket,
          first: this.student_info.first,
          second: this.student_info.second,
          third: this.student_info.third,
          avg: this.student_info.avg,
          result: this.student_info.result
        };
        }
      );
  }

  CreateList() {

    this.info = {
      group: '',
      direction_code: '',
      direction_name: '',
      faculty: '',
      date: '',
      comissions: [
        {
          fio: '',
          students: [
            {
              index: '',
              fio: '',
              ticket: '',
              first: '',
              second: '',
              third: '',
              avg: '',
              result: ''
            }
          ]
        }
      ]
    };

    this.info.group = this.group.group;
    this.direction = this.directions
      .find(direction => direction.profiles
        .includes(Number(this.profiles
          .find(profile => profile.groups.includes(Number(this.group.code))).code)));
    this.info.direction_code = this.direction.num;
    this.info.direction_name = this.direction.value;

    this.info.faculty = this.faculties.find(faculty => faculty.directions.includes(Number(this.direction.code))).value;
    moment.locale('ru');
    this.info.date = this.group.date_exam
      .map(date => moment(date).format('LL'));
    // this.info.date.splice(0, 1);

    this.comissions_check.map(comission => {
      this.ShowRating(comission);
      this.info.comissions.push({
        fio: comission.fio,
        students: this.students_list
      });
    });
    this.info.comissions.splice(0, 1);

    this.appService.CreateList(this.info)
      .subscribe(res => {
        this.result = res;
      });
  }

}
