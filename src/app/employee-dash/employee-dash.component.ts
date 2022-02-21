import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employe-dash.model';



@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();

  employeeData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder:FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
        email: [''],
        telefone: [''],
        salary:['']
      }
    )
    
    this.getAll();

  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.telefone = this.formValue.value.telefone;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.post(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Success");

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();//resta o formulario quando der o submit
      this.getAll();//atualiza a pagina 

    },err=>{
      alert("Something went wrong");
    }
    )
  }

  getAll(){
    this.api.get(this.employeeData)
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  delete(row: any){
    this.api.delete(row.id)
    .subscribe(res => {
      alert("DELETADO")
      this.getAll();//ATUALIZAR APOS EXCLUSAO
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['telefone'].setValue(row.telefone)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.telefone = this.formValue.value.telefone;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.update(this.employeeModelObj, this.employeeModelObj.id)////////
    .subscribe(res => {
      alert("ATUALIZADO")


      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();//resta o formulario quando der o submit
      this.getAll();//atualiza a pagina 

    })
  }

}
