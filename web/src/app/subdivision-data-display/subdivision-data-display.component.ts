import { Component, OnInit } from '@angular/core';
import { SubdivisionService } from '../services/subdivision-data-display.service';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit {
  subdivisions: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  filteredSubdivisions: any[] = [];
  statusFilter: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  statusFilterList: string[] = ['Active', 'Future', 'Builtout'];
  pageCountList: number[] = [10, 20, 50, 100];

  constructor(private subdivisionService: SubdivisionService) {}

  ngOnInit() {
    // Load subdivisions data on component initialization
    this.loadSubdivisions();
  }

  loadSubdivisions() {
    // Fetch subdivisions data from the service
    this.subdivisionService.getSubdivisions().subscribe(
      (data) => {
        // Store the fetched data
        this.subdivisions = data;
        // Apply filters and sorting
        this.applyFiltersAndSort();
      },
      (error) => {
        // Log error if the request fails
        console.error('Error fetching subdivisions:', error);
      }
    );
  }

  applyFiltersAndSort() {
    // Filter subdivisions based on the selected status
    this.filteredSubdivisions = this.subdivisions.filter(sub => 
      this.statusFilter ? sub.subdivisionStatusCode === this.statusFilter : true
    );

    // Sort filtered subdivisions based on the selected field and direction
    if (this.sortField) {
      this.filteredSubdivisions.sort((a, b) => {
        const aValue = a[this.sortField];
        const bValue = b[this.sortField];
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Reset to the first page after applying filters and sorting
    this.currentPage = 1;
  }

  setStatusFilter(status: string) {
    // Set the status filter and reapply filters and sorting
    this.statusFilter = status;
    this.applyFiltersAndSort();
  }

  setPageCount(count: number) {
    // Set the page size with count
    this.pageSize = count;
  }


  setSortField(field: string) {
    // Toggle the sort direction if the same field is clicked, otherwise set to ascending
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    // Apply filters and sorting
    this.applyFiltersAndSort();
  }

  get paginatedSubdivisions() {
    // Calculate and return the subdivisions for the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredSubdivisions.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    // Calculate the total number of pages based on the filtered subdivisions
    return Math.ceil(this.filteredSubdivisions.length / this.pageSize);
  }

  nextPage() {
    // Move to the next page if not on the last page
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    // Move to the previous page if not on the first page
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
