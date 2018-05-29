import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppServiceService } from '../../../../app-service.service';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-exam-sec-protocol',
  templateUrl: './exam-sec-protocol.component.html',
  styleUrls: ['./exam-sec-protocol.component.scss', '../exam-sec.component.scss'],
  preserveWhitespaces: false
})
export class ExamSecProtocolComponent implements OnInit, OnChanges {

  @Input() date: any;
  @Input() group: any;
  @Input() students: any;
  @Input() comissions: any;
  @Input() tickets: any;

  constructor(
    private appService: AppServiceService
  ) { }

  month: any;

  result: any;
  profile: any;
  direction: any;

  faculties: any;
  directions: any;
  profiles: any;
  ranks: any;

  students_list: any;
  students_local: any;
  start_protocol: number;
  protocol_num: number;
  rank: any;
  time_start: any;
  time_end: number;
  index: number;
  start: number;
  end: number;
  ticket: any;
  auto_check: boolean;
  order_num: string;
  order_date: any;

  info: {
    group: string,
    program: string,
    direction_code: string,
    direction_name: string,
    profile: string,
    date: any,
    hour: any,
    pred: string,
    comissia: string,
    secretary: string,
    order_date: any,
    order_num: any,
    students: [
      {
        fio: string,
        protocol: number,
        first: string,
        second: string,
        third: string,
        characteristic: string,
        rate: string,
        disadvantege: string
      }
    ]
  };

  ngOnInit() {
    this.students_list = [];
    this.start_protocol = 1;
    this.result = {
      status: 'false',
      body: ''
    };

    this.info = {
      group: '',
      program: '',
      direction_code: '',
      direction_name: '',
      profile: '',
      date: null,
      hour: [],
      pred: '',
      comissia: '',
      secretary: '',
      order_date: '',
      order_num: '',
      students: [
        {
          fio: '',
          protocol: null,
          first: '',
          second: '',
          third: '',
          characteristic: '',
          rate: '',
          disadvantege: ''
        }
      ]
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

    this.appService.GetRanks()
      .subscribe(response => {
        this.ranks = response;
      });

    this.students_list = this.students.filter(student => isNullOrUndefined(student.result) !== true);
  }

  ngOnChanges() {
    this.students_list = [];
    this.start_protocol = 1;
    this.result = {
      status: 'false',
      body: ''
    };

    this.info = {
      group: '',
      program: '',
      direction_code: '',
      direction_name: '',
      profile: '',
      date: null,
      hour: [],
      pred: '',
      comissia: '',
      secretary: '',
      order_date: '',
      order_num: '',
      students: [
        {
          fio: '',
          protocol: null,
          first: '',
          second: '',
          third: '',
          characteristic: '',
          rate: '',
          disadvantege: ''
        }
      ]
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

    this.appService.GetRanks()
      .subscribe(response => {
        this.ranks = response;
      });

    this.students_list = this.students.filter(student => isNullOrUndefined(student.result) !== true);
  }

  CreateProtocol() {

    this.info = {
        group: '',
        program: '',
        direction_code: '',
        direction_name: '',
        profile: '',
        date: null,
        hour: [],
        pred: '',
        comissia: '',
        secretary: '',
        order_date: '',
        order_num: '',
        students: [
        {
          fio: '',
          protocol: null,
          first: '',
          second: '',
          third: '',
          characteristic: '',
          rate: '',
          disadvantege: ''
        }
      ]
    };

    this.info.group = this.group.group;
    this.info.order_num = this.order_num;
    moment.locale('ru');
    this.info.order_date = moment(this.order_date).format('LL');
    this.info.program = this.group.program;

    this.profile = this.profiles.find(profile => profile.code === this.group.id_profiles);
    this.info.profile = this.profile.value;

    this.direction = this.directions.find(direction => direction.code === this.profile.id_directions);
    this.info.direction_code = this.direction.num;
    this.info.direction_name = this.direction.value;

    this.info.date = this.group.date_exam
      .map( date => {
        this.month = moment(date).format('D MMMM').split(' ');
        return {
          day: moment(date).format('D'),
          month: this.month[1],
          year: moment(date).format('YYYY')
        };
      });

    this.info.pred = this.comissions
      .find(comission => comission.role === 'p' ).fio;

    this.comissions
      .filter(comission => {
        if ( comission.role === 'c' ) {
          this.info.comissia += comission.fio + ', ';
        }
      });
    this.info.comissia = this.info.comissia.substr(0, this.info.comissia.length - 2);

    this.info.secretary = this.comissions
      .find(comission => comission.role === 's' ).fio;

    this.time_start = moment('09:00', 'HH:mm').format();

    this.start = 0;
    this.end = 10;
    this.info.hour = this.info.date
      .map( date => {
        this.time_end = 45 * this.students_list.slice(this.start, this.end).length;
        this.start += 10;
        this.end += 10;
        return {
          hour: moment(this.time_start).add(this.time_end, 'm' ).format('HH'),
          minute: moment(this.time_start).add(this.time_end, 'm').format('mm'),
        };
      });

      this.protocol_num = this.start_protocol - 1;
      this.students_local = this.students_list
        .map(student => {
          this.protocol_num++;
          this.rank = this.ranks.find(rank => rank.value === student.result);
          this.ticket = this.tickets.find(ticket => ticket.number === student.ticket);
          return {
            code: student.code,
            fio: student.fio,
            protocol: this.protocol_num,
            first: this.ticket.first_question,
            second: this.ticket.second_question,
            third: this.ticket.third_question,
            characteristic: this.rank.characteristic,
            rate: this.rank.value_full,
            disadvantege: this.rank.disadvantege
          };
        });

    this.info.students = this.students_local;

    if ( isNullOrUndefined(this.students_local) !== true ) {
      this.appService.CreateProtocol(this.info)
        .subscribe(res => {
          this.result = res;
          this.SetProtocol();
        });
    }
  }

  SetProtocol() {
    this.students_local.map(student => {
      this.appService.SetProtocol(student.code, student.protocol)
        .subscribe(response => {
          console.log(response);
        });
    });
  }


}
