import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PaisService {

    url  :string='https://restcountries.eu/rest/v2/lang/es';

    constructor( private http : HttpClient) { }

    /*getPaises(){
        return this.http.get(this.url).pipe(
            map(
                ( datos:any[] ) => {
                    return datos.map( (pais:any[]) =>{
                        return {
                            nombre:  pais.name,
                            codigo:  pais.alpha3Code
                        }
                    } )
                }
            )
        );
    }*/

    getPaises() {

      return this.http.get(this.url)
      .pipe(map(
          datos => 
               datos.map( pais => ({nombre:  pais.name, codigo:  pais.alpha3Code }) )        
          ));
      
    }
}
