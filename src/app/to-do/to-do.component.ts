import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [ReactiveFormsModule, ConfirmDialogModule, ToastModule, NgFor,NgIf],
  providers: [ConfirmationService, MessageService],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent implements OnInit {

  allItems: any = [];
  addItemForm: FormGroup = new FormGroup({
    itemName: new FormControl(null)
  });

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private _Router:Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      let items = localStorage.getItem('items');
      if (items != null) {
        this.allItems = JSON.parse(items);
      }
    }
  }

  addItem(addItemForm: FormGroup) {
    if (addItemForm.get('itemName')?.value !== null && addItemForm.get('itemName')?.value !== ' ') {
      this.allItems.push(addItemForm.value);
      localStorage.setItem('items', JSON.stringify(this.allItems));
      addItemForm.get('itemName')?.setValue(null);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added' });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You must enter an item' });
    }
    
  }

  deleteItem(id: number) {
    this.allItems.splice(id, 1);
    localStorage.setItem('items', JSON.stringify(this.allItems));
  }

  clearList() {
    this.allItems = [];
    localStorage.setItem('items', JSON.stringify(this.allItems));
  }

  handleLogout() {
    localStorage.setItem('isLogin', 'false');
    this._Router.navigate(['/login']);
  }
  
  deleteItemConfirm(event: Event,id:number) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

          accept: () => {
                this.deleteItem(id);
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
  }
  
  clearListConfirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to clear the list?',
            header: 'Clear list Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

          accept: () => {
                this.clearList();
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'List cleared' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

}
