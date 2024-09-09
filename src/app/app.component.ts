import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from './Model/model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_18_crud';

  employeeForm!: FormGroup;
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];

  constructor(){
    this.createForm();
    let data = localStorage.getItem('Employee_data');
    if(data != null){
      this.employeeList = JSON.parse(data);
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      id : new FormControl(this.employeeObj.id),
      name : new FormControl(this.employeeObj.name, [Validators.required]),
      designation : new FormControl(this.employeeObj.designation, [Validators.required]),
      salary : new FormControl(this.employeeObj.salary, [Validators.required]),
      state : new FormControl(this.employeeObj.state, [Validators.required]),
      pincode : new FormControl(this.employeeObj.pincode, [Validators.required, Validators.minLength(6)]),
      address : new FormControl(this.employeeObj.address, [Validators.required])
    })
  }

  onReset(){
    this.employeeObj = new Employee();
    this.createForm();
  }

  onSave(){
    let data = localStorage.getItem('Employee_data');
    if(data != null){
      let parseData = JSON.parse(data);
      this.employeeForm.controls['id'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeForm.controls['id'].setValue(1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('Employee_data', JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item: Employee){
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate(){
    let record = this.employeeList.find(m => m.id == this.employeeForm.controls['id'].value);
    if(record != undefined){
      record.name = this.employeeForm.controls['name'].value;
      record.designation = this.employeeForm.controls['designation'].value;
      record.salary = this.employeeForm.controls['salary'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.pincode = this.employeeForm.controls['pincode'].value;
      record.address = this.employeeForm.controls['address'].value;
    }
    localStorage.setItem('Employee_data', JSON.stringify(this.employeeList));
    this.onReset();
  }

  onDelete(id: number){
    let isDelete = confirm('Are you sure? You want to delete this item?')
    if(isDelete){
      let index = this.employeeList.findIndex(m => m.id == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('Employee_data', JSON.stringify(this.employeeList));
      this.onReset();
    }
  }

}
