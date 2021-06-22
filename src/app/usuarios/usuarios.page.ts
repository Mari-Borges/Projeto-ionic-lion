/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/service/post';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: any = [];
  limit = 10;
  start = 0;
  nome = '';


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private provider: Post,
    private storage: NativeStorage,
    ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.usuarios = [];
    this.start = 0;
    this.carregar();
  }
  registrar(){
    this.route.navigate(['/registro']);
  }

  carregar(){
    return new Promise(resolve => {
      this.usuarios = [];
      let dados ={
        requisicao: 'list',
        nome : this.nome,
        limit: this.limit,
        start: this.start
      };

      this.provider.dadosApi(dados, 'api.php' ).subscribe(data => {
        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let usuario of data['result']){
            this.usuarios.push(usuario);
          }
        }
         resolve(true);
        });
    });

  }
  editar(id, nome, email, senha, telefone, endereco){
    this.route.navigate(['/registro/' + id + '/' + nome + '/' + email + '/' + senha + '/' + telefone + '/' + endereco + '/']);



  }
  delete(id){
    return new Promise(resolve => {
      let dados ={
        requisicao: 'delete',
        id : id,

      };

      this.provider.dadosApi(dados, 'api.php' ).subscribe(data => {
      this.ionViewWillEnter();

        });
    });


  }

  doRefresh(event) {

    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  //barra de rolagem
  loadData(event) {
    this.start += this.limit;
    setTimeout(() => {
      this.carregar().then(()=>{
        event.target.complete();
       });
    }, 500);

  }
  logout(){
    this.storage.clear();
    this.route.navigate(['/login']);
  }
}

