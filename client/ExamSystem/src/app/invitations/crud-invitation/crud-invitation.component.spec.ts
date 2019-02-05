import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvitationComponent } from './crud-invitation.component';

describe('CrudInvitationComponent', () => {
  let component: CrudInvitationComponent;
  let fixture: ComponentFixture<CrudInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
