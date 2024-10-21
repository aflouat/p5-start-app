import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSession: Session = {
    id: 123,
    name: 'test',
    description: 'session de yoga',
    date: new Date('2024-10-18'), // Exemple de date, à remplacer par la date souhaitée
    teacher_id: 1, // Exemple d'identifiant du professeur
    users: [1, 2, 3], // Liste d'identifiants d'utilisateurs participant à la session
    createdAt: new Date('2024-10-01'), // Exemple de date de création
    updatedAt: new Date('2024-10-15') // Exemple de date de mise à jour
  };
  const mockSessionService = {
    sessionInformation: {
      token: 'abc123',
      type:'',
      id: 1,
      username:'test@example.com',
      firstName:'test',
      lastName:'test',
      admin: false
    }
  } 
  const mockRouter   = {
    navigate : jest.fn(),
    url: '/sessions'
  }
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '123' // Example session ID
      }
    }
  }
    const mockSessionApiService={
      detail : jest.fn().mockReturnValue(of(mockSession))
   
  };


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide:Router, useValue:mockRouter},
        { provide: SessionService, useValue: mockSessionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide mock ActivatedRoute
        {provide:SessionApiService,useValue:mockSessionApiService}
      ],
      declarations: [FormComponent,ListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if admin and navigate to /sessions ', ()=>{
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
  })

  it('should test ngOnInit if url include update set onUpdate', ()=>{
    mockRouter.url = '/api/session/update/123'
    component.ngOnInit();
    mockSessionApiService.detail('123').subscribe((session:Session)=>{
      expect(session).toBe(mockSession);

    })
  })
  it('sould test ngOnInit if url with create calling initForm',()=>{
      mockRouter.url = '/api/session/create'
      component.ngOnInit();
      expect(component.sessionForm?.get('name')?.value).toBe('');
      expect(component.sessionForm?.get('date')?.value).toBe('');

      expect(component.sessionForm?.get('teacher_id')?.value).toBe('');

      expect(component.sessionForm?.get('description')?.value).toBe('');

    })
   

  


});
