import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { SubdivisionService } from '../services/subdivision-data-display.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let service: SubdivisionService;

  const mockSubdivisions = [
    // Add mock data to test various cases
    { name: 'Subdivision A', code: '001', subdivisionStatusCode: 'Active', population: 100 },
    { name: 'Subdivision B', code: '002', subdivisionStatusCode: 'Future', population: 200 },
    { name: 'Subdivision C', code: '003', subdivisionStatusCode: 'Builtout', population: 300 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivisionDataDisplayComponent],
      providers: [
        { provide: SubdivisionService, useValue: { getSubdivisions: () => of(mockSubdivisions) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SubdivisionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSubdivisions on init', () => {
    spyOn(service, 'getSubdivisions').and.callThrough();
    component.ngOnInit();
    expect(service.getSubdivisions).toHaveBeenCalled();
  });

  it('should set statusFilter and apply filter correctly', () => {
    component.setStatusFilter('Active');
    fixture.detectChanges();
    expect(component.filteredSubdivisions.length).toBe(1);
    expect(component.filteredSubdivisions[0].subdivisionStatusCode).toBe('Active');
  });

  it('should set sortField and sort direction correctly', () => {
    component.setSortField('population');
    fixture.detectChanges();
    expect(component.sortField).toBe('population');
    expect(component.sortDirection).toBe('asc');
    
    component.setSortField('population');
    fixture.detectChanges();
    expect(component.sortDirection).toBe('desc');
  });

  it('should paginate data correctly', () => {
    component.pageSize = 2; 
    fixture.detectChanges();

    // Check first page
    component.currentPage = 1;
    fixture.detectChanges();
    expect(component.paginatedSubdivisions.length).toBe(2);

    // Check second page
    component.currentPage = 2;
    fixture.detectChanges();
    expect(component.paginatedSubdivisions.length).toBe(1);
  });

  it('should calculate totalPages correctly', () => {
    component.pageSize = 2; // Set pageSize for testing
    fixture.detectChanges();
    expect(component.totalPages).toBe(2); // 3 items and pageSize is 2
  });

  it('should handle pagination controls', () => {
    component.pageSize = 1; // Set pageSize for testing
    component.currentPage = 1;
    fixture.detectChanges();

    expect(component.totalPages).toBe(3); // 3 items and pageSize is 1

    component.nextPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);

    component.nextPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(3);

    component.nextPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(3); // Should not exceed total pages

    component.previousPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
  });

});
