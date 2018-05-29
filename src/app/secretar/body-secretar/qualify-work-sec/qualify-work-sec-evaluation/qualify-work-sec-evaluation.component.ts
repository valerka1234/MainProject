import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualify-work-sec-evaluation',
  templateUrl: './qualify-work-sec-evaluation.component.html',
  styleUrls: ['./qualify-work-sec-evaluation.component.scss'],
  providers: []
})
export class QualifyWorkSecEvaluationComponent implements OnInit, OnChanges {

  @Input() students: any;
  @Input() group: { code: string, group: string };
  @Input() comission_list: [{ code: string, fio: string, group_code: string, status: boolean }];

  comissions: any;
  comissions_check: any;
  comission_person: { code: string, fio: string, group_code: string, status: boolean };

  students_list: any;
  student_info: any;

  constructor() { }

  ngOnInit() {
    this.FilterComission();
    this.comission_person = {
      code: '000',
      fio: null,
      group_code: null,
      status: false
    };
  }

  ngOnChanges() {
    this.FilterComission();
    this.comission_person = {
      code: '000',
      fio: null,
      group_code: null,
      status: false
    };
  }

  CheckComission(person) {
    this.comission_list.find(comission => comission.code === person.code).status = true;
    this.FilterComission();
  }

  UnCheckComission(person) {
    this.comission_list.find(comission => comission.code === person.code).status = false;
    this.FilterComission();
  }

  FilterComission() {
    this.comissions = this.comission_list.filter(comission => comission.status === false);
    this.comissions_check = this.comission_list.filter(comission => comission.status === true);
  }

  ShowRating(person) {
    this.comission_person = person;
    this.students_list = this.students.map(
      student => {
        this.student_info = student.comissions.find(comission => comission.code_comission === person.code);
        return {
          code: student.code,
          fio: student.fio,
          first_rate: this.student_info.first_rating,
          second_rate: this.student_info.second_rating,
          third_rate: this.student_info.third_rating,
          avg_rate: Number(((Number(this.student_info.first_rating) + Number(this.student_info.second_rating) + Number(this.student_info.third_rating)) / 3)).toFixed(0),
          result_rate: student.result_rate
        };
      }
    );
  }

}
