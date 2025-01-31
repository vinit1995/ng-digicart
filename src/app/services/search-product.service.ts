import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  constructor() { }

  searchSubject = new Subject<string>()

  emitSearch(data: string) {
    this.searchSubject.next(data)
  }
}
