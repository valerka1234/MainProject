
import { Routes } from '@angular/router';
import { QualifyWorkSecComponent } from './secretar/body-secretar/qualify-work-sec/qualify-work-sec.component';
import { ExamSecComponent } from './secretar/body-secretar/exam-sec/exam-sec.component';
import { HomeComponent } from './secretar/body-secretar/home/home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'exam-sec',
    component: ExamSecComponent
  }, {
    path: 'qualify-sec',
    component: QualifyWorkSecComponent
  }
];
