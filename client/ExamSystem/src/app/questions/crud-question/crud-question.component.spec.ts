import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudQuestionComponent } from './crud-question.component';

describe('CrudQuestionComponent', () => {
  let component: CrudQuestionComponent;
  let fixture: ComponentFixture<CrudQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
