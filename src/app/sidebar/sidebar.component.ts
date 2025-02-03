import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { FilterCategoryService } from '../services/filter-category.service';
import { SearchProductService } from '../services/search-product.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})  
export class SidebarComponent {
  categories: string[] = [];
  selectedCategory: string = "";
  @ViewChild("searchForm") searchForm!: NgForm; 
  categoryListService = inject(CategoryService)
  filterCategoryService = inject(FilterCategoryService)
  searchProductService = inject(SearchProductService)

  router = inject(Router)
  constructor() {}
  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories():void {
    this.categories = this.categoryListService.checkLocalForCategory();
  }

  filterCategory(item: string) {
    this.selectedCategory = item
    this.filterCategoryService.emitFilterSearch(this.selectedCategory)    
  }

  searchProduct() {
    this.searchProductService.emitSearch(this.searchForm.value.searchInp)
    this.searchForm.resetForm()
  }
}
