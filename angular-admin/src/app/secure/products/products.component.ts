import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../interfaces/product";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage!: number;

  constructor(
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.refresh()
  }

  refresh(currentPage = 1) {
    this.productService.all(currentPage).subscribe(
      (res: any) => {
        this.products = res.data
        this.lastPage = res.meta.last_page
      }
    )
  }

  delete(id: number) {
    if(confirm('Are you sure?')) {
      this.productService.delete(id).subscribe(
        res => {
          this.products = this.products.filter(u => u.id != id);
        }
      );
    }
  }

  canAccess(permissions: any) {
    return Auth.canAccess(permissions)
  }
}
