import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register(){
    const {username, password, cpassword} = this
    if(password !== cpassword){
      return console.error("Passwords do not match")
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      console.log(res)
    }catch(error){
      console.dir(error)
    }
  }

}
