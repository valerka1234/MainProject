import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from '../../../../app-service.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-exam-sec-grading',
  templateUrl: './exam-sec-grading.component.html',
  styleUrls: ['./exam-sec-grading.component.scss']
})
export class ExamSecGradingComponent implements OnInit, OnChanges {

  @Input() group: any;
  @Input() comissions: any;
  @Input() students: any;

  @Output() OnReturnStudents = new EventEmitter<any>();

  comissions_pred: any;
  students_rate: any;
  students_local: any;

  result: number;
  first: number;
  second: number;
  third: number;
  comission: string;
  auto_check: boolean;

  constructor(
    private appService: AppServiceService
  ) { }

  ngOnInit() {
    this.auto_check = false;
    this.first = null;
    this.second = null;
    this.third = null;
    this.comission = null;

    this.comissions_pred = [];
    if ( isNullOrUndefined(this.comissions) !== true ) {
      this.comissions_pred = this.comissions;
    }

    this.GetStudents();
  }

  ngOnChanges() {

    this.comissions_pred = [];
    if ( isNullOrUndefined(this.comissions) !== true ) {
      this.comissions_pred = this.comissions;
    }

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
          comissions: this.comissions.map(person => person.fio),
          result: student.result
        };
      });
    }
  }

  SetComission(selectedValue: any, student: any) {
    this.students_local.find(stud => stud.code === student.code).comission = selectedValue.target.value;
    this.appService.SetComission(student.code, this.comissions.find(comission => comission.fio === selectedValue.target.value).id_comission)
      .subscribe(response => {
        console.log(response);
      });
  }

  ReplaceNumberFirst(key, student) {
    if (['Backspace', 'Delete', '1', '2', '3', '4', '5', 'Tab'].includes(key.key)) {
      if ( isNullOrUndefined(student.first) || student.first === '' && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        if ( isNullOrUndefined(student.comission) === true ) {
          student.comission = this.comissions[0].fio;
        }
        this.appService.CreateRanks(student.code, this.comissions
          .find(comission => comission.fio === student.comission).id_comission, Number(key.key), '1')
          .subscribe(response => {
            console.log(response);
          });
      }
      if ( isNullOrUndefined(student.first) !== true && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        if ( student.first !== key.key) {
          this.appService.SetRanks(student.code, Number(key.key), '1')
            .subscribe(response => {
              console.log(response);
            });
        }
        student.first = null;
      }
      if ( ( isNullOrUndefined(student.first) !== true || student.first === '' ) && ['Backspace', 'Delete'].includes(key.key) ) {
        this.appService.DeleteRanks(student.code, '1')
          .subscribe(response => {
            console.log(response);
          });
        student.first = null;
      }
      return true;
    } else {
      return false;
    }
  }

  ReplaceNumberSecond(key, student) {
    if (['Backspace', 'Delete', '1', '2', '3', '4', '5', 'Tab'].includes(key.key)) {
      if ( isNullOrUndefined(student.second) || student.second === '' && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        if ( isNullOrUndefined(student.comission) === true ) {
          student.comission = this.comissions[0].fio;
        }
        this.appService.CreateRanks(student.code, this.comissions
          .find(comission => comission.fio === student.comission).id_comission, Number(key.key), '2')
          .subscribe(response => {
            console.log(response);
          });
      }
      if ( isNullOrUndefined(student.second) !== true && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        if ( student.second !== key.key) {
          this.appService.SetRanks(student.code, Number(key.key), '2')
            .subscribe(response => {
              console.log(response);
            });
        }
        student.second = null;
      }
      if ( ( isNullOrUndefined(student.second) !== true || student.second === '' ) && ['Backspace', 'Delete'].includes(key.key) ) {
        this.appService.DeleteRanks(student.code, '2')
          .subscribe(response => {
            console.log(response);
          });
        student.second = null;
      }
      return true;
    } else {
      return false;
    }
  }

  ReplaceNumberThird(key, student) {
    if (['Backspace', 'Delete', '1', '2', '3', '4', '5', 'Tab'].includes(key.key)) {
      if ( ( isNullOrUndefined(student.third) || student.third === '' ) && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        if ( isNullOrUndefined(student.comission) === true ) {
          student.comission = this.comissions[0].fio;
        }
        this.appService.CreateRanks(student.code, this.comissions
          .find(comission => comission.fio === student.comission).id_comission, Number(key.key), '3')
          .subscribe(response => {
            console.log(response);
          });
      }
      if ( isNullOrUndefined(student.third) !== true && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        if ( student.third !== key.key) {
          this.appService.SetRanks(student.code, Number(key.key), '3')
            .subscribe(response => {
              console.log(response);
            });
        }
        student.third = null;
      }
      if ( ( isNullOrUndefined(student.third) !== true || student.third === '' ) && ['Backspace', 'Delete'].includes(key.key) ) {
        this.appService.DeleteRanks(student.code, '3')
          .subscribe(response => {
            console.log(response);
          });
        student.third = null;
      }
      return true;
    } else {
      return false;
    }
  }

  ReplaceNumberResult(key, student) {
    if (['Backspace', 'Delete', '1', '2', '3', '4', '5', 'Tab'].includes(key.key)) {
      this.result = null;
      if ( ['1', '2', '3', '4', '5'].includes(key.key) ) {
        this.result = Number(key.key);
      }
      if (student.result !== key.key) {
        this.appService.SetResult(student.code, this.result)
          .subscribe(response => {
            console.log(response);
          });
        this.students.find(stud => stud.code === student.code).result = this.result;
      }
      if ( isNullOrUndefined(student.result) !== true && ['1', '2', '3', '4', '5'].includes(key.key) ) {
        student.result = null;
      }
      return true;
    } else {
      return false;
    }
  }

}
