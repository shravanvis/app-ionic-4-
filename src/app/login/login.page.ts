import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth, private auth: AuthService) { }

  ngOnInit() {
  }

  async Login(){
    const {username, password } = this
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
    }
    catch(err){
      console.dir(err)
      if(err.code == "auth.user-not-found"){
        console.log("user not found")
      }
    }
    
  }

  loginWithGoogle(){
    this.auth.login();
  }

  logOutWithGoogle(){
    this.auth.logout()
  }
}
