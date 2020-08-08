import { Component, OnInit } from '@angular/core';
import { Mensajes } from '../utils/Mensajes';
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreService } from '../Service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appStateProduct } from '../Reducers/app.reducerProduct';
import { Store } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  CustomExist: boolean;
  EmailCustomer: string = "";
  HasCustomer: boolean = false;
  ObjCustomer: any;
  ObjProduct: unknown[];
  Total: any;
  modalRef: BsModalRef;

  constructor(private mensajes: Mensajes,
    private spinner: NgxSpinnerService,
    private service: StoreService,
    private formBuilder: FormBuilder,
    private storeProducts: Store<appStateProduct>,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      numId: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  changeTypePerson(event) {
    let option = event.target.value;
    if (option == "1") {
      this.CustomExist = true;
      this.ObjCustomer = [];
      this.HasCustomer = false;
      this.EmailCustomer = "";
    }
    else {
      this.CustomExist = false;
      this.ObjCustomer = [];
      this.HasCustomer = false;
      this.EmailCustomer = "";
    }
  }

  SearchCustomer(template) {
    if (this.EmailCustomer == "") {
      this.mensajes.MostrarAdvertencia("Por favor ingrese un correo valido");
      return false;
    }

    let resValidation = this.ValidateEmail(this.EmailCustomer);
    if (resValidation) {
      this.GetCustomer(this.EmailCustomer, template);
    }
    else {
      this.mensajes.MostrarAdvertencia("Por favor ingrese un correo valido");
      return false;
    }
  }

  GetCustomer(EmailCustomer: string, template) {
    this.service.GetCustomer(EmailCustomer).then(
      (res) => {
        let ObjCustomer = res["data"];
        if (ObjCustomer.numId) {
          this.HasCustomer = true;
          this.ObjCustomer = res["data"];
          this.GetProducts();
          this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
        }
        else {
          this.mensajes.MostrarAdvertencia("No se encontro el usuario con ese correo, por favor verifiquelo")
        }
      }
    ).catch(
      (error) => {
        console.log(error);
        this.mensajes.MostrarError("Ha ocurrido un error");
      }
    );
  }

  GetProducts() {
    this.storeProducts.select('ProductCar')
      .subscribe(
        (product) => {
          let Objproduct = this.RemoveDuplicate(product.ProductCar);
          this.ObjProduct = Objproduct;
        }
      )
    this.GetTotal();
  }

  GetTotal() {
    this.storeProducts.select('Total')
      .subscribe(
        (product) => {
          this.Total = product.Total;
        }
      )
  }

  RemoveDuplicate(product) {
    let object = Array.from(product.reduce((m, t) => m.set(t.id, t), new Map()).values());
    return object;
  }

  ValidateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  get f() { return this.registerForm.controls; }

  onSubmit(template) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let name = this.registerForm.controls["name"].value;
    let numId = this.registerForm.controls["numId"].value;
    let address = this.registerForm.controls["address"].value;
    let phoneNumber = this.registerForm.controls["phoneNumber"].value;
    let email = this.registerForm.controls["email"].value;

    let resValidation = this.ValidateEmail(email);
    if (!resValidation) {
      this.mensajes.MostrarAdvertencia("Por favor ingrese un correo valido");
      return false;
    }

    let ObjCustomer = {
      name,
      numId,
      address,
      phoneNumber,
      email
    }

    this.spinner.show();
    this.SendInfo(ObjCustomer, template);
  }

  SendInfo(ObjCustomer, template) { 
    this.service.SaveCustomer(ObjCustomer).then(
      (res) => {
        if (res["mensaje"] !== "") {
          this.mensajes.MostrarAdvertencia(res["mensaje"]);
        }
        else {
          this.mensajes.MostrarExitoso("La información se ha guardado con éxito");
        }
        
        this.spinner.hide();
        this.HasCustomer = true;
        this.CustomExist = true;
        this.ObjCustomer = ObjCustomer;
        this.GetProducts();
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
      }
    ).catch(
      (error) => {
        console.log(error);
        this.mensajes.MostrarError("Error al guardar la información")
      }
    )
  }

}
