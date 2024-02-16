import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MesRegistrationComponent } from './mes-registration.component';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('MesRegistrationComponent', () => {
    let component: MesRegistrationComponent;
    let fixture: ComponentFixture<MesRegistrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MesRegistrationComponent],
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MaterialModule
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MesRegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be invalid when form is empty', () => {
        component.registrationForm.setValue({
            username: '',
            password: '',
            badgeNumber: '',
            groupName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
        });
        expect(component.registrationForm.valid).toBeFalsy();
    });

    it('should be valid when form is filled correctly', () => {
        component.registrationForm.setValue({
            username: 'test@example.com',
            password: 'password123',
            badgeNumber: '12345',
            groupName: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
        });
        expect(component.registrationForm.valid).toBeTruthy();
    });

    // Add more test cases as needed
});
