import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { Post } from 'src/service/post';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public parametro: string;

  nome: string;
  dadosLogin: any;

  constructor(
    private router: Router,
    private provider: Post,
    private storage: NativeStorage,
    public toast: ToastController,
    private platform: Platform
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.nome = this.dadosLogin.nome;


    });
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
