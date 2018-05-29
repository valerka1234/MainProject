import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeadComponent } from './secretar/head-secretar/head.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './routerConfig';
import { OrderPipe } from 'ngx-order-pipe';
import { HomeComponent } from './secretar/body-secretar/home/home.component';
import { ExamSecComponent } from './secretar/body-secretar/exam-sec/exam-sec.component';
import { QualifyWorkSecComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec.component';
import { ExamSecCreateComponent } from './secretar/body-secretar/exam-sec/exam-sec-create/exam-sec-create.component';
import { ExamSecDistributeComponent } from './secretar/body-secretar/exam-sec/exam-sec-distribute/exam-sec-distribute.component';
import { ExamSecEvaluationComponent } from './secretar/body-secretar/exam-sec/exam-sec-evaluation/exam-sec-evaluation.component';
import { ExamSecProtocolComponent } from './secretar/body-secretar/exam-sec/exam-sec-protocol/exam-sec-protocol.component';
import { ExamSecHelpComponent } from './secretar/body-secretar/exam-sec/exam-sec-help/exam-sec-help.component';
import { ExamSecMainComponent } from './secretar/body-secretar/exam-sec/exam-sec-main/exam-sec-main.component';
import { QualifyWorkSecMainComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec-main/qualify-work-sec-main.component';
import { QualifyWorkSecEvaluationComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec-evaluation/qualify-work-sec-evaluation.component';
import { QualifyWorkSecQuestionsComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec-questions/qualify-work-sec-questions.component';
import { QualifyWorkSecProtocolComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec-protocol/qualify-work-sec-protocol.component';
import { QualifyWorkSecVipiskaComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec-vipiska/qualify-work-sec-vipiska.component';
import { QualifyWorkSecHelpComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec-help/qualify-work-sec-help.component';
import { ComissionService } from './json/comission.service';
import { StudentsService } from './json/students.service';
import { GroupsService } from './json/groups.service';
import { TicketsService } from './json/tickets.service';
import { AppServiceService } from 'app/app-service.service';
import { ExamSecGradingComponent } from './secretar/body-secretar/exam-sec/exam-sec-grading/exam-sec-grading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    HomeComponent,
    ExamSecComponent,
    QualifyWorkSecComponent,
    ExamSecCreateComponent,
    ExamSecDistributeComponent,
    ExamSecEvaluationComponent,
    ExamSecProtocolComponent,
    ExamSecHelpComponent,
    ExamSecMainComponent,
    QualifyWorkSecMainComponent,
    QualifyWorkSecEvaluationComponent,
    QualifyWorkSecQuestionsComponent,
    QualifyWorkSecProtocolComponent,
    QualifyWorkSecVipiskaComponent,
    QualifyWorkSecHelpComponent,
    OrderPipe,
    ExamSecGradingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [GroupsService, ComissionService, TicketsService, StudentsService, AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
