import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/service/post';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  id: string;
  nome: string;
  telefone: number;
  senha: string;
  email: string;
  endereco: string;


  constructor(
    private actRouter: ActivatedRoute,
    private route: Router,
    private provider: Post,
    private toastController: ToastController
    ) { }

  ngOnInit() {
      this.actRouter.params.subscribe((data: any)=>{
      this.id = data.id;
      this.nome = data.nome;
      this.email = data.email;
      this.telefone = data.telefone;
      this.endereco = data.endereco;
      this.senha = data.senha;

    });
  }
  usuarios() {
    this.route.navigate(['/usuarios']);
  }

  async mesagem(){
    const toast = await this.toastController.create({
      message: 'bem sucediso',
      duration: 2000
    });
    toast.present();
  }

  salvar(){
    return new Promise(resolve => {
      const dados ={
        requisicao: 'add',
        nome : this.nome,
        telefone : this.telefone,
        senha : this.senha,
        email : this.email,
        endereco : this.endereco
      };

      this.provider.dadosApi(dados, 'api.php' ).subscribe(
        data => {
         this.route.navigate(['/usuarios']);
         this.mesagem();
        });
    });

  }

  editar(){
    return new Promise(resolve => {
      const dados ={
        requisicao: 'editar',
        nome : this.nome,
        telefone : this.telefone,
        senha : this.senha,
        email : this.email,
        endereco : this.endereco,
        id : this.id
      };

      this.provider.dadosApi(dados, 'api.php' ).subscribe(
        data => {
         this.route.navigate(['/usuarios']);
         this.mesagem();
        });
    });

  }


}
