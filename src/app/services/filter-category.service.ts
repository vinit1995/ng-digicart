import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterCategoryService {

  constructor() { }

  filterSubject = new Subject<string>()

  emitFilterSearch(data: string) {
    this.filterSubject.next(data)
  }
}
