import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PaisService } from '../../services/pais.service';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

    usuario = {
        nombre:    'Miguel',
        apellido:  'Silvano',
        correo:    'miguel@gmail.com',
        pais:      'CRI',
        genero:    'M'
    };

    paises : any[] = [];

    constructor( private pais : PaisService ) { }

    ngOnInit(): void {

        this.pais.getPaises().subscribe(
            data => {
                this.paises = data;

                this.paises.unshift({
                    nombre: '[Seleccione un País]',
                    codigo:  ''
                })
            }
        );

    }

    guardar( formulario : NgForm ){

        if( formulario.invalid ){
            Object.values( formulario.controls ).forEach( validacion => {
                validacion.markAsTouched();
            });
        return ;
        }

    }

}
