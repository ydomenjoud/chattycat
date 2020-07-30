import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

//init app
admin.initializeApp(functions.config().firebase);

function fdocToJS<T>(doc: admin.firestore.QueryDocumentSnapshot<T>): T {
    const options = {
        replacement: "-",
        remove: /[&,+()$~%.'":*?<>{}]/g,
        lower: true
    };
    const slug = require("slugify")((doc.data() as any)?.title, options);
    return {
        ...doc.data(),
        slug,
        id: doc.id,
        ref: doc.ref.path
    };
}

export const getBooks = functions
    .region('europe-west1')
    .https.onRequest(async (request, response) => {

    const docs = await admin.firestore()
        .collection('books').get()
        .then(b => b.docs.map(fdocToJS));

    response.json(docs);
});
