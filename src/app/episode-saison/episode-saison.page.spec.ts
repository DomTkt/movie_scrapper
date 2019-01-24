import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSaisonPage } from './episode-saison.page';

describe('EpisodeSaisonPage', () => {
  let component: EpisodeSaisonPage;
  let fixture: ComponentFixture<EpisodeSaisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeSaisonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeSaisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
