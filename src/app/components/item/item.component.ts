import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  newItem = { name: '', description: '', price: null };
  editingItem: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.apiService.getItems().subscribe(data => this.items = data);
  }

  addItem() {
    if (this.editingItem) {
      this.updateItem();
    } else {
      this.apiService.addItem(this.newItem).subscribe(() => {
        this.loadItems();
        this.newItem = { name: '', description: '', price: null };
      });
    }
  }

  editItem(item: any) {
    this.editingItem = { ...item }; // Clone the item to avoid direct reference issues
  }

  updateItem() {
    if (!this.editingItem) return;
    this.apiService.updateItem(this.editingItem._id, this.editingItem).subscribe(() => {
      this.loadItems();
      this.editingItem = null; // Reset edit mode
    });
  }

  deleteItem(id: string) {
    this.apiService.deleteItem(id).subscribe(() => this.loadItems());
  }
}
