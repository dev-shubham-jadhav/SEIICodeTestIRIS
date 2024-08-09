import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubdivisionService } from './subdivision-data-display.service';

describe('SubdivisionService', () => {
  let service: SubdivisionService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/v1/subdivisions';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubdivisionService]
    });

    service = TestBed.inject(SubdivisionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve subdivisions from the API via GET', () => {
    const mockSubdivisions = [
      {
        name: 'Subdivision A',
        code: '001',
        longitude: '123.456',
        latitude: '78.910',
        fieldSurveyTerritoryId: '001',
        marketId: '001',
        subdivisionStatusId: 'Active',
        surveyMethodId: 'Method A',
        activeSections: 5,
        futureSections: 10,
        builtOutSections: 15,
        totalLots: 30,
        fieldSurveyTerritoryName: 'Territory A',
        marketName: 'Market A',
        marketAbbreviation: 'MA',
        subdivisionStatusCode: 'A',
        surveyMethodCode: 'Method A',
        county: 'County A',
        community: 'Community A',
        zoom17Date: '2024-01-01T00:00:00Z',
        zoom18Date: '2024-02-01T00:00:00Z',
        subdivisionGeometryId: '001',
        subdivisionGeometryBoundingBoxId: '001',
        subdivisionGeometryBoundaryId: '001',
        subdivisionGeometryIntelligenceBoundaryId: '001',
        subdivisionGeometryIntelligenceBoundaryStatusId: '001',
        subdivisionGeometryIntelligenceBoundaryStatusCode: 'A',
        subdivisionGeometryIntelligenceBoundaryStatusChangeDate: '2024-03-01T00:00:00Z',
        nearMapImageDate: '2024-04-01T00:00:00Z',
        imageBoxId: '001',
        mostRecentIPointBatchDate: '2024-05-01T00:00:00Z',
        iPoints: 100,
        validatediPoints: 90,
        subdivisionSpecificStatus: 'Status A'
      }
    ];

    service.getSubdivisions().subscribe((subdivisions) => {
      expect(subdivisions.length).toBe(1);
      expect(subdivisions).toEqual(mockSubdivisions);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ subdivisions: mockSubdivisions });
  });

  it('should return an empty array if the response is not an array', () => {
    service.getSubdivisions().subscribe((subdivisions) => {
      expect(subdivisions).toEqual([]);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ notSubdivisions: [] });
  });

  it('should handle HTTP errors gracefully', () => {
    const errorMessage = 'Unable to fetch data';

    service.getSubdivisions().subscribe(
      (subdivisions) => {
        fail('Expected an error, but got subdivisions');
      },
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
