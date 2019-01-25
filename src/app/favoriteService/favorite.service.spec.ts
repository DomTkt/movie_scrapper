import { FavoriteService } from './favorite.service';
import { TestBed } from '@angular/core/testing';

describe('FavoriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteService = TestBed.get(FavoriteService);
    expect(service).toBeTruthy();
  });
});
