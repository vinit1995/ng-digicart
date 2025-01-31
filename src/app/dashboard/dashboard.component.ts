import { Component, inject } from '@angular/core';
import { Products } from '../../types/products';
import { CardComponent } from '../card/card.component';
import { FilterCategoryService } from '../services/filter-category.service';
import { SearchProductService } from '../services/search-product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  productList: Products[] = []  
  categoryFilterService = inject(FilterCategoryService)
  searchProductService = inject(SearchProductService)

  ngOnInit(): void {  
    this.getLocalProducts()

    this.categoryFilterService.filterSubject.subscribe((data) => { 
      this.getLocalProducts()
      if(data == "all") {
        this.getLocalProducts()
      }else {
        const filteredProducts = this.productList.filter(product => product.category === data);
        this.productList = filteredProducts
      }      
    }) 
    
    this.searchProductService.searchSubject.subscribe((params) => {
      this.getLocalProducts()
      const searchedProducts = this.productList.filter(product => {
        return product.productName.toLowerCase().trim().includes(params.toLowerCase().trim())
      });
      this.productList = searchedProducts
    })
  }

  getLocalProducts(): void {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem("productData")
      this.productList = storedProducts ? JSON.parse(storedProducts) : []
    }
  }
}
