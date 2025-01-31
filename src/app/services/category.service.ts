import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }  
  categoryList: string[] = []

  checkLocalForCategory() : any {
    if (typeof window !== 'undefined') {
      const storedData =  localStorage.getItem('categoryData');
      return this.categoryList = storedData ? JSON.parse(storedData) : [];
    }
  }
}
