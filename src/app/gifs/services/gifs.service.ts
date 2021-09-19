import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string='oT8sDLlt84EAom3447v8HZaRTkvg044P';
  private servicioUrl: string='https://api.giphy.com/v1/gifs';
  private _historiarl:string[]=[];

  //cambar any por su tipo correspondiente 
  public resultados :Gif[]=[]

  constructor(
   private http:HttpClient
  ) { 
    if(localStorage.getItem('historial')){
      this._historiarl=JSON.parse(localStorage.getItem('historial')!);
    }
    //otra forma de mostrar los resultados de localstorage
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial(){
    return[...this._historiarl]
  }
  
 
  buscarGifs(query:string=''){
    //almacenar todo en minusculas
  query=query.trim().toLocaleLowerCase();
    //condicion para no aceptar duplicados 
    if(!this._historiarl.includes(query)){
      this._historiarl.unshift(query);
      this._historiarl=this._historiarl.splice(0,10); //limitamos a que solo se guarden 10 registros en el historial
   localStorage.setItem('historial',JSON.stringify(this._historiarl));
    }
    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('limit', '10')
          .set('q', query)

          console.log(params.toString);
          
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})//aca va la url de la imagen o gif
    .subscribe((resp)=>{
      console.log(resp.data);
      this.resultados=resp.data;
      localStorage.setItem('resultados',JSON.stringify(this._historiarl));

    });
    
  }




}
