import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';


@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css']
})

export class ReactiveComponent implements OnInit {

    forma          : FormGroup;  
    expresion_mail : string = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

    constructor( private formBuilder : FormBuilder,
                 private Validadors : ValidadoresService ) {
        this.crearFormulario();
        this.CargarData();
        this.crearListeners();
    }

    ngOnInit(): void {
    }

    CargarData() {
        //reset tambien puede usarse
        //this.forma.setValue({
        this.forma.reset({
            nombre        :  'Javier',
            apellido      :  'Fernando',
            correo        :  'kdjv@kdcfj.com',
            password1        :  '123',
            password2        :  '123',
            direccion     :{
                distrito  :  'dlkvd',
                ciudad    :  'dkfm'
            }
        });

        ['comer','dormir'].forEach(valor=>this.pasatiempos.push(this.formBuilder.control(valor)));
    }
  
    crearListeners() {
        /*this.forma.valueChanges.subscribe(
            valor=>{
                console.log(valor);
            }
        );*/
        //this.forma.statusChanges.subscribe(status=>console.log({status}));
        this.forma.get('nombre')?.valueChanges.subscribe(console.log);
    }
    
    agregarUnPasatiempo() {
        this.pasatiempos.push( this.formBuilder.control('', Validators.required) );
    }

    borrarPasaTiempo(posicion:number) {
        this.pasatiempos.removeAt(posicion);
    }

    get pasatiempos() {
        return this.forma.get('pasatiempos') as FormArray;
    }

    get NombreNoValido() : boolean {
        return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
    }
    get AppellidoNoValido() : boolean {
        return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
    }
    get MailNoValido() : boolean {
        return this.forma.get('correo').invalid && this.forma.get('correo').touched;
    }
    get DistritoNoValido() : boolean {
        return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
    }
    get CiudadNoValido() : boolean {
        return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
    }
    get PasswordNoValido() : boolean {
        return this.forma.get('password1').invalid && this.forma.get('password1').touched;
    }
    get UsuarioNoValido() : boolean {
        return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
    }
    get ConfirmarPassword() : boolean {
        const pass1 = this.forma.get('password1')?.value;
        const pass2 = this.forma.get('password2')?.value;

        return ( pass2 == pass1 )? false : true;
    }  

    crearFormulario() {
      
        this.forma = this.formBuilder.group({
            //Sincronoz-asincronos
            nombre    :  [ '' , [ Validators.required , Validators.minLength(5) ] ],
            apellido  :  [ '' ,[Validators.required, this.Validadors.noHerrera]],
            correo    :  [ '' , [ Validators.required, Validators.pattern(this.expresion_mail) ] ],
            usuario   :  ['', ,this.Validadors.noExiste],
            password1 :  ['',Validators.required],
            password2 :  ['',Validators.required],
            direccion :  this.formBuilder.group({
                distrito    :  [ '' , Validators.required ],
                ciudad      :  [ '' , Validators.required ]
            }),
            pasatiempos: this.formBuilder.array([]),      
            },{
            validators: this.Validadors.passwordequals('password1','password1')
        });
    }

    guardar(){
        if( this.forma.invalid ){
            /*return Object.values( this.forma.controls ).forEach(validacion=>{
                validacion.markAsTouched();
            });*/
            /*
            if ( this.forma.invalid ) {
                return Object.values(this.forma.controls).forEach(control => {
                    if ( control instanceof FormGroup ) {
                        Object.values( control.controls ).forEach( ctrl => ctrl.markAsTouched());
                    } else {
                control.markAsTouched();
            }});}
            */

            return this.forma.markAllAsTouched();
        }
        this.forma.reset({
            nombre: 'sin nombre'
        });
    }
}
