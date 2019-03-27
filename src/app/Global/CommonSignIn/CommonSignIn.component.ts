import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl  } from '@angular/forms'

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  public data_users;
  constructor(public router:Router) { }

  form= new FormGroup({
    nombre: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    
  }
  signin(){
    this.data_users=this.form.value; 
    console.log(this.data_users);
    this.router.navigate(['/home/']);
  }

}
