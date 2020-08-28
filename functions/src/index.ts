
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as func from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });


//Calcula a média das notas datas pelos jurados
exports.calculaMediaNotas = func.firestore.document(`participantes/{uidParticipante}/notas/{uidNota}`).onWrite((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    console.log(newValue)
    console.log(previousValue)
    admin.firestore().collection(`participantes/{uidParticipante}/notas`).get().then(notas => {
        console.log(notas)


    }).catch(error => {
        console.error('Erro ao recuperar notas do participante');
        return Promise.reject();
    })
});