import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Resolver } from 'dns';

interface ErrorValidate{
    [s:string] : boolean
}

@Injectable({ providedIn: 'root' })

export class ValidadoresService {

    constructor() { }

    noHerrera( control:FormControl ): ErrorValidate{
        if ( control.value?.toLowerCase() === 'herrera'){   
            return{ noHerrera: true };
        }
        return null;
    }

    passwordequals( pass1Name:string, pass2Name:string){
    
        return ( formGroup: FormGroup )=>{
      
            const Pass1Control=formGroup.controls[pass1Name];
            const Pass2Control=formGroup.controls[pass2Name];            

            if(Pass1Control.value === Pass2Control.value){
                Pass2Control.setErrors(null);
            }else{
                Pass2Control.setErrors({
                    noEsIgual:true
                });
            }
        };
    }

    noExiste( control: FormControl ):Promise<ErrorValidate> | Observable<ErrorValidate>{
        
        if(!control.value){
            return Promise.resolve(null);
        }
        
        return new Promise(
            (resolve,reject)=>{
                setTimeout(()=>{
                    if(control.value=='strider'){
                        resolve({ existe:true });
                    }else{
                        resolve(null);
                    }
                },3500);
            }
        );
    }
}
