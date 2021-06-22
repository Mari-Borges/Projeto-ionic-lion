/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/service/post';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(
    private native: NativeStorage,
    private route: Router,
    private provider: Post,
    public toast: ToastController,
  ) { }

  ngOnInit() {
  }
 async login(){
    if(this.email == ""){
      const toast = await this.toast.create({
        message: 'Preencha o usuario',
        duration: 2000,
        color: 'blue'
      });
      toast.present();
      return;
    }

    if(this.senha == ""){
      const toast = await this.toast.create({
        message: 'Preencha o usuario',
        duration: 2000,
        color: 'blue'
      });
      toast.present();
      return;
    }

      let dados = {
        requisicao: 'login',
        email : this.email,
        senha: this.senha,

      };

      this.provider.dadosApi(dados, 'api.php').subscribe(async data => {
        var alert = data['msg'];
        if(data['success']) {
          this.native.setItem('session_storage', data['result']);
          this.route.navigate([ '/usuarios']);
          const toast = await this.toast.create({
            message: 'Logado com Sucesso!!',
            duration: 1000,
            color: 'success'
          });
          toast.present();
          this.email = "";
          this.senha = "";
          console.log(data);
        }else{
          const toast = await this.toast.create({
            message: alert,
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
        });
  }


}
