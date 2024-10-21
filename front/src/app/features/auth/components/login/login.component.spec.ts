import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuthService = {
    login: jest.fn()
  };

  // Mock for SessionService
  const mockSessionService = {
    logIn: jest.fn()
  };

  // Mock for Router
  const mockRouter = {
    navigate: jest.fn()
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [   
        { provide: AuthService, useValue: mockAuthService },
        { provide: SessionService, useValue: mockSessionService },
        { provide: Router, useValue: mockRouter }],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email and password fields', () => {
    // Vérifie que le formulaire est initialisé avec les bons contrôles
    const form = component.form;
    expect(form.contains('email')).toBe(true);
    expect(form.contains('password')).toBe(true);

    // Vérifie que les validations sont correctement appliquées
    const emailControl = form.get('email');
    const passwordControl = form.get('password');

    expect(emailControl?.valid).toBe(false); // email vide au départ, donc invalide
    expect(passwordControl?.valid).toBe(false); // mot de passe vide au départ, donc invalide

    // Simuler l'entrée d'une adresse email valide et d'un mot de passe
    emailControl?.setValue('test@example.com');
    passwordControl?.setValue('password123');
    
    expect(emailControl?.valid).toBe(true); // Devrait être valide maintenant
    expect(passwordControl?.valid).toBe(true); // Devrait être valide maintenant
  });

  it('should log in the user and navigate on successful login', () => {
    // Données simulées pour le formulaire
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123'
    };

    const mockSessionInfo: SessionInformation = {
     
      token: 'abc123',
      type:'',
      id: 1,
      username:'test@example.com',
      firstName:'test',
      lastName:'test',
      admin:false
    };
  
    // Simuler que authService.login() retourne un Observable avec un succès
    mockAuthService.login.mockReturnValue(of(mockSessionInfo));

    // Simuler que le formulaire contient les bonnes valeurs
    component.form.setValue({
      email: loginRequest.email,
      password: loginRequest.password
    });

    // Appel de la méthode submit
    component.submit();
    expect(mockAuthService.login).toHaveBeenCalledWith(loginRequest);
    expect(mockSessionService.logIn).toHaveBeenCalledWith(mockSessionInfo);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);

  });

  it('should set onError to true on login failure', () => {
    // Simuler une erreur lors de la connexion
    mockAuthService.login.mockReturnValue(throwError('Login failed'));

    // Simuler que le formulaire contient des valeurs valides
    component.form.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    // Appel de la méthode submit
    component.submit();

    // Vérifier que authService.login a été appelé
    expect(mockAuthService.login).toHaveBeenCalled();

    // Vérifier que onError est défini à true en cas d'erreur
    expect(component.onError).toBe(true);
  });
});
