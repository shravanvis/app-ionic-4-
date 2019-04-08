import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // image: SafeResourceUrl;
  image: SafeResourceUrl;

  constructor(private auth: AuthService, private domSanitizer: DomSanitizer){ }

  logInWithGoogle(){
    this.auth.login();
  }
  logOutWithGoogle(){
    this.auth.logout()
  }

  async takePhoto(){
    const { Camera } = Plugins;

    const result = await Camera.getPhoto({
      quality: 75,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
    });

    this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(result && result.base64Data,);
  }
}
