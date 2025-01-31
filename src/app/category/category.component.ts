import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  public categoryName: string = "";
  public categoryData: any[] = ["all"];
  public error: string = "";
  @ViewChild("categoryForm") categoryForm!: NgForm; 

  constructor(private toastr: ToastrService) {}
  categoryListService = inject(CategoryService)

  ngOnInit(): void {
    this.checkLocalForCategory()
  }

  showtoastr(title: string, body: string) {
    this.toastr.success(body, title);
  }

  checkLocalForCategory() {    
    this.categoryData = this.categoryListService.checkLocalForCategory();
  }

  saveLocalCategory(name: string) {
    if(this.categoryData.includes(name.toLowerCase().trim())) {
      this.error = "Category name already exists"
    }else {
      this.categoryData.push(name.toLowerCase().trim())
      localStorage.setItem("categoryData", JSON.stringify(this.categoryData))
      this.showtoastr("New Category Added", "category saved successfully")
      this.checkLocalForCategory()
      this.error = ""; 
    }      
  }

  saveCategory() {
    if (this.categoryForm && this.categoryForm.value.name) {
      this.categoryName = this.categoryForm.value.name.trim()
      if(this.categoryName) {
       this.saveLocalCategory(this.categoryName)
       this.categoryForm.resetForm()
      }
    }
  }

}
