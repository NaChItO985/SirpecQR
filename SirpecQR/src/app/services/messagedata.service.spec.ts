import { TestBed } from '@angular/core/testing';

import { MessagedataService } from './messagedata.service';

describe('MessagedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagedataService = TestBed.get(MessagedataService);
    expect(service).toBeTruthy();
  });
});
