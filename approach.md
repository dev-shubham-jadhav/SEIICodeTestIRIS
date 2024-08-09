# Solution Approach


## Part 1: Displaying Subdivision Data

### Approach

1. **Service Setup**
   - **File:** `subdivision-data-display.service.ts`
   - **Objective:** Create an Angular service to fetch subdivision data from the API.
   - **Implementation:**
     - Use `HttpClient` to make a GET request to the API endpoint (`http://localhost:3000/v1/subdivisions`).
     - Parse the response to extract the `subdivisions` array.
     - Return the data as an Observable.

2. **Component Setup**
   - **File:** `subdivision-data-display.component.ts`
   - **Objective:** Create a component to display the subdivision data in a table.
   - **Implementation:**
     - Inject the `SubdivisionService` to retrieve data on component initialization.
     - Store the data and implement methods to apply filters, sorting, and pagination.

3. **Template and Styling**
   - **Files:**
     - `subdivision-data-display.component.html`
     - `subdivision-data-display.component.css`
   - **Objective:** Design the UI to present data in a table format with filter buttons, sorting functionality, and pagination controls.
   - **Implementation:**
     - Create a table to display subdivision attributes.
     - Implement filter buttons to filter data by status.
     - Add sorting functionality to table headers.
     - Implement pagination to handle large datasets. Dropwdown is provided for selecting nos of items to be displayed on that given page.

## Part 2: Filtering and Sorting

### Filtering

1. **Functionality:**
   - Provide dropdown to filter data based on `subdivisionStatusCode` (Active, Future, Builtout).
   - Default All data is displayed.

2. **Implementation:**
   - **Method:** `setStatusFilter(status: string)`
     - Update the `statusFilter` and reapply filters.
     - Refresh the displayed data according to the selected filter.

### Sorting

1. **Functionality:**
   - Allow sorting of the data by `name` or `nearMapImageDate`.
   - Toggle sorting direction between ascending and descending.
   - To sort, click on column desired column name.

2. **Implementation:**
   - **Method:** `setSortField(field: string)`
     - Set the sort field and direction based on user interaction.
     - Reapply sorting and update the displayed data.

## Part 3: Unit Testing

### Test Cases

1. **Service Tests**
   - Verify that the `SubdivisionService` correctly fetches and processes data.
   - Test cases include:
     - Successful data retrieval and correct mapping of subdivisions.
     - Handling of non-array responses.
     - Graceful error handling.

2. **Component Tests**
   - Verify that the `SubdivisionDataDisplayComponent`:
     - Fetches data on initialization.
     - Applies filters correctly.
     - Sorts data based on the selected field and direction.
     - Handles pagination and displays correct pages.
   - Test cases include:
     - Initialization and data fetching.
     - Filtering functionality.
     - Sorting functionality.
     - Pagination control.

### Run Server
- Assuming repo is cloned already.
1. **Frontend - Angular Application:**
  - Command to install config, packages and run server:
     ```bash
     cd web

     npm install

     ng serve
     ``

2. **Backend - Express Application:**
  - Command to install config, packages and run server:
     ```bash
     cd api

     npm install

     npm run start
     ``
### Testing Commands

1. **Run Tests:**
   - Command to run all unit tests:
     ```bash
     ng test
     ```

2. **Check Code Coverage:**
   - Command to check code coverage with Jasmine:
     ```bash
     ng test --code-coverage
     ```
   - Coverage reports will be generated in the `coverage` directory.

---

### UI Representation:

<br><br>
![Zonda UI](screenshots/Screenshots1.png?raw=true "Zonda UI 1")

<br><br>
![Zonda UI](screenshots/Screenshots2.png?raw=true "Zonda UI 2")

<br><br>
![Zonda UI](screenshots/Screenshots3.png?raw=true "Zonda UI 3")

<br><br>
![Zonda UI](screenshots/Screenshots4.png?raw=true "Zonda UI 4")


<br><br>
![Zonda UI](screenshots/Screenshots3.png?raw=true "Zonda UI 3")

<br><br>
![Zonda UI](screenshots/Screenshots4.png?raw=true "Zonda UI 4")

<br><br>
![Zonda UI](screenshots/Screenshots5.png?raw=true "Zonda UI 3")

<br><br>
![Zonda UI](screenshots/Screenshots6.png?raw=true "Zonda UI 4")

### Testing

<br><br>
![Zonda UI testing](screenshots/Testing.png?raw=true "Zonda UI 5")

<br><br>
![Zonda testing coverage](screenshots/Coverage.png?raw=true "Zonda UI 6")

