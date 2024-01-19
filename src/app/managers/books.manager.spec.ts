import { TestBed } from '@angular/core/testing';

import { BooksManager} from "./books.manager";

describe('BooksService', () => {
  let service: BooksManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
