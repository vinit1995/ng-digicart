import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../../types/products';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { FilterCategoryService } from '../services/filter-category.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productData: Products[] = []    
  categories: string[] = [];
  categoryListService = inject(CategoryService)
  categoryFilterService = inject(FilterCategoryService)
  
  productForm!: FormGroup

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      category: new FormControl("default", Validators.required),
    })

    this.checkProductInLocal()  
    this.getAllCategories()        
  }

  generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
  
  getAllCategories():void {
    this.categories = this.categoryListService.checkLocalForCategory();
  }

  checkProductInLocal() {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('productData');
      this.productData = storedData ? JSON.parse(storedData) : [];
    }
  }
  
  updateProductToLocal(product: Products) : boolean {    
      this.checkProductInLocal()
      const checkDuplicate = this.productData.some(item => item.id === product.id)
      if(checkDuplicate) return false
      this.productData.push(product)
      localStorage.setItem("productData", JSON.stringify(this.productData))
      return true
  } 

  saveProduct() {
    const product: Products = {
      id: this.generateUniqueId(),
      ...this.productForm.value
    }
    const saveProd = this.updateProductToLocal(product)    
    if(saveProd) {
      this.checkProductInLocal()
      this.showtoastr("Product Saved", "New product has been added")
      this.productForm.reset()
    }else {
      this.showtoastr("Error", "Something went wrong")
    }    
  }
  showtoastr(title: string, body: string) {
    this.toastr.success(body, title);
  }
}
  