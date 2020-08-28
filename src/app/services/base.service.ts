import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Jurado } from '../class/jurado.class';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Participante } from '../class/participante.class';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private firestore: AngularFirestore,
    private auth: AngularFireAuth) {

  }

  preparaObjeto(objeto) {
    return JSON.parse(JSON.stringify((objeto)));
  }


  alterarParticipante(participante: Participante) {
    return this.firestore.doc('participantes/' + participante.uid).update(this.preparaObjeto(participante));
  }

  adicionarParticipante(participante: Participante) {
    return this.firestore.collection('participantes').add(this.preparaObjeto(participante));
  }
  votar(participante: Participante, nota) {
    return this.firestore.collection('participantes/' + participante.uid + '/' + 'notas').add(this.preparaObjeto(nota));
  }
  listarNotas(uid) {
    return this.firestore.collection('participantes/' + uid + '/' + 'notas').valueChanges({ idField: 'uid' });
  }
  removerNota(uidParticipante, uidNota) {
    return this.firestore.collection('participantes/' + uidParticipante + '/' + 'notas/').doc(uidNota).delete();
  }

  removerParticipante(uid) {
    return this.firestore.doc('participantes/' + uid).delete();
  }

  listarParticipantes() {
    return this.firestore.collection('participantes', ref => ref.orderBy('categoria')).valueChanges({ idField: 'uid' });
  }

  filtrarParticipantes(filtro: string) {
    return this.firestore.collection('participantes', ref => ref.where('categoria', '==', filtro)).valueChanges({ idField: 'uid' });
  }

  listarApresentando(filtro: string) {
    return this.firestore.collection('participantes', ref => ref.where('apresentando', '==', filtro)).valueChanges({ idField: 'uid' });
  }

  novoJurado(jurado: Jurado) {
    return this.firestore.collection('jurados').add(this.preparaObjeto(jurado));
  }

  login(email, senha) {
    return this.auth.signInWithEmailAndPassword(email, senha);
  }


  //JURADO
  listarJurados() {
    return this.firestore.collection('jurados', ref => ref.orderBy('nome')).valueChanges({ idField: 'uid' });
  }
  adicionarJurado(jurado: Jurado) {
    return this.firestore.collection('jurados').add(this.preparaObjeto(jurado));
  }
  alterarJurado(jurado: Jurado) {
    return this.firestore.doc('jurados/' + jurado.uid).update(this.preparaObjeto(jurado));
  }
  removerJurado(uid) {
    return this.firestore.doc('jurados/' + uid).delete();
  }

  //RANKING
  listarRanking() {
    return this.firestore.collection('participantes', ref => ref.orderBy('media', "desc")).valueChanges({ idField: 'uid' });
  }
  filtrarRanking(filtro: string) {
    return this.firestore.collection('participantes', ref => ref.where('categoria', '==', filtro).orderBy('media', "desc")).valueChanges({ idField: 'uid' });
  }
}
