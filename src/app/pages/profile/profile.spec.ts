import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { ProfileComponent } from './profile';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  // Mock AuthService
  const mockAuthService = {
    user$: of({
      nickname: 'testuser',
      name: 'Lauren Terry',
    }),
  };

  // Mock HttpClient
  const mockHttpClient = {
    get: jasmine.createSpy('get').and.returnValue(of([])), // returns empty repos array
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        {
          provide: HttpClient,
          useValue: mockHttpClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should only return the first name', () => {
    expect(component.nameHandler('Lauren Terry')).toBe('Lauren');
  });

  it('should only return the first name, the user name has more than one blank space', () => {
    expect(component.nameHandler('Lauren   Terry')).toBe('Lauren');
  });

  it('should only return the first name, but there is only one name', () => {
    expect(component.nameHandler('Lauren')).toBe('Lauren');
  });

  it('should only return the first name, there is only one name with a space at the end', () => {
    expect(component.nameHandler('Lauren ')).toBe('Lauren');
  });

  it('should only return the first name, there is only one name with a space at the beginning', () => {
    expect(component.nameHandler(' Lauren')).toBe('Lauren');
  });

  it('should only return the first name, but the user has many names', () => {
    expect(component.nameHandler('Dorothy Henderson Heather Henderson Penelope Jones')).toBe(
      'Dorothy'
    );
  });

  it('should populate repos and firstName on init', () => {
    // ngOnInit has already run at fixture.detectChanges()
    expect(component.repos).toEqual([]); // mocked HTTP returns empty array
    expect(component.firstName).toBe('Lauren'); // from mocked AuthService name
  });
});
