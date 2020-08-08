import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable()
export class Mensajes {

    constructor(public toastr: ToastrManager,  ) { }

    MostrarExitoso(mensaje: string) {
        this.toastr.successToastr(mensaje, 'Confirmación!'); 
    }

    MostrarError(mensaje: string) {
        this.toastr.errorToastr(mensaje, 'Oops!');
    }

    MostrarAdvertencia(mensaje: string) {
        this.toastr.warningToastr(mensaje, 'Validación');
    }

    MostrarInformacion(mensaje: string) {
        this.toastr.infoToastr(mensaje, 'Información importante');
    }
}