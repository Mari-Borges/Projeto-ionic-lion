/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lion } from 'src/service/lion';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  publicacaos: any = [];
  limit = 10;
  start = 0;
  publicacao = '';

  constructor(
    private route: Router,
    private lion: Lion,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.publicacaos = [];
    this.start = 0;
    this.carregar();
  }
  registrar(){
    this.route.navigate(['/publicar']);
  }
  carregar(){
    return new Promise(resolve => {
      this.publicacaos = [];
      let dados ={
        requisicao: 'feed',
        publicacao : this.publicacao,
        limit: this.limit,
        start: this.start
      };
      this.lion.dadosApi(dados, 'lion.php' ).subscribe(data => {
        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let publicacao of data['result']){
            this.publicacaos.push(publicacao);
          }
        }
         resolve(true);
        });
    });

  }
  editar(id, publicacao){
    this.route.navigate(['/publicar/' + id + '/' + publicacao + '/']);



  }
  delete(id){
    return new Promise(resolve => {
      let dados ={
        requisicao: 'delete',
        id:id,

      };

      this.lion.dadosApi(dados, 'lion.php' ).subscribe(data => {
      this.ionViewWillEnter();

        });
    });


  }
  fazerpublicacao(){
    this.route.navigate(['/publicar']);
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
}
