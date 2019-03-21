import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss']
})
export class LoginComponent implements OnInit {
  public datos_usuario;
  public respuesta:boolean;
  public datos_erroneos:boolean;
  
  constructor(public router: Router) { }
  form= new FormGroup({
  nombre: new FormControl(''),
  contraseña: new FormControl(''),
});
  
  ngOnInit() {
  }
  accept(){
    this.datos_usuario=this.form.value;
    this.respuesta=true;
    
    if (this.respuesta){
      this.router.navigate(['/menu']);
    }else {
      console.log("datos erroneos");
      this.datos_erroneos=true;
    }
    console.log(this.datos_usuario);     
  }

}
