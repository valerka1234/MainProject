import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { AppServiceService } from '../../../../app-service.service';

@Component({
  selector: 'app-exam-sec-distribute',
  templateUrl: './exam-sec-distribute.component.html',
  styleUrls: ['./exam-sec-distribute.component.scss', '../exam-sec.component.scss']
})
export class ExamSecDistributeComponent implements OnInit, OnChanges {

  @Input() group: any;
  @Input() students: any;
  @Input() tickets: any;


  @Output() OnReturnStudents = new EventEmitter<any>();

  students_list: any;
  student: { code: string, fio: string, protocol: number, result: number, ticket: number };
  ticket: { number: number, first_question: string, second_question: string, third_question: string };

  constructor(
    private appService: AppServiceService
  ) { }

  ngOnInit() {
    this.Initialisation();
  }

  ngOnChanges() {
    this.Initialisation();
  }

  Initialisation() {
    this.ticket = {
      number: null,
      first_question: null,
      second_question: null,
      third_question: null
    };
    this.student = {
      code: null,
      fio: '',
      protocol: null,
      ticket: null,
      result: null
    };
    this.GetTickets();
  }

  ShowTicketInfo(student) {
    this.student = this.students.find(stud => stud.code === student.code);
    this.ticket = this.tickets.find(ticket => ticket.number === this.student.ticket);
  }

  SetTicket(selectedValue: any, student: any) {
    this.students.find(stud => stud.code === student.code).ticket = Number(selectedValue.target.value);
    this.students_list.find(stud => stud.code === student.code).ticket = Number(selectedValue.target.value);
    if (Number(selectedValue.target.value) === 0) {
      this.students.find(stud => stud.code === student.code).ticket = null;
    }
    this.appService.SetTicket(student.code, this.students.find(stud => stud.code === student.code).ticket)
      .subscribe(response => {
        console.log(response);
      });
  }

  GetTickets() {
    this.students_list = [];
    this.students_list = this.students.map(student => {
      return {
        code: student.code,
        fio: student.fio,
        protocol: student.protocol,
        result: student.result,
        ticket: isNullOrUndefined(student.ticket) ? 0 : student.ticket,
        tickets: isNullOrUndefined(this.tickets) ? null : this.tickets.map(ticket => ticket.number)
      };
    });
  }

}
