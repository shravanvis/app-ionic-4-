import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth, private auth: AuthService, public user: UserService, public router: Router) { }

  ngOnInit() {
  }

  async Login(){
    const {username, password } = this
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)

      if(res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/tabs'])
      }
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
