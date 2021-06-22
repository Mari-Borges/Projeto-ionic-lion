import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Lion } from 'src/service/lion';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  id: string;
  publicacao: string;

  constructor(
    private actRouter: ActivatedRoute,
    private route: Router,
    private lion: Lion,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data: any) => {
     this.id = data.id;
     this.publicacao = data.publicacao;
    });
  }
  async mesagem(){
    const toast = await this.toastController.create({
      message: 'bem sucediso',
      duration: 2000
    });
    toast.present();
  }
  publicar(){
    return new Promise(resolve => {
     const dados = {
       requisicao: 'publicar',
       publicacao: this.publicacao
     };

     this.lion.dadosApi(dados, 'lion.php' ).subscribe(
       data => {
         this.route.navigate(['/feed']);
         this.mesagem();
       });
    });
  }
  editar(){
    return new Promise(resolve => {
      const dados ={
        requisicao: 'editar',
        publicacao : this.publicacao,
        id : this.id
      };

      this.lion.dadosApi(dados, 'lion.php' ).subscribe(
        data => {
         this.route.navigate(['/feed']);
         this.mesagem();
        });
    });

  }


}
