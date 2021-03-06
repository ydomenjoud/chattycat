import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const region = 'europe-west1';

//init app
admin.initializeApp(functions.config().firebase);

function fdocToJS<T>(doc: admin.firestore.QueryDocumentSnapshot<T>): T {
    const options = {
        replacement: "-",
        remove: /[&,+()$~%.'":*?<>{}]/g,
        lower: true
    };

    const data: any = doc.data() as any;
    if (!data.name && data.title) {
        data.name = data.title;
    }
    const slug = require("slugify")(data?.name, options);
    return {
        ...data,
        slug,
        id: doc.id,
        ref: doc.ref.path
    };
}

export const books = functions
    .region(region)
    .https.onRequest(async (request, response) => {

    const docs = await admin.firestore()
        .collection('books').get()
        .then(b => b.docs.map(fdocToJS));

    response.json(docs);
});

export const authors = functions
    .region(region)
    .https.onRequest(async (request, response) => {

        const docs = await admin.firestore()
            .collection('authors').get()
            .then(b => b.docs.map(fdocToJS));

        response.json(docs);
    });


export const collections = functions
    .region(region)
    .https.onRequest(async (request, response) => {

        const docs = await admin.firestore()
            .collection('collections').get()
            .then(b => b.docs.map(fdocToJS));

        response.json(docs);
    });


export const slides = functions
    .region(region)
    .https.onRequest(async (request, response) => {
        const docs = await admin.firestore()
            .collection('slides').get()
            .then(b => b.docs.map(fdocToJS));

        response.json(docs);
    });


export const newsletter = functions.region(region).https.onRequest(async (request, response) => {
    const email = request.params?.email;
    if (email) {
        await admin.firestore()
            .collection('newsletter')
            .add({
                email,
                date: new Date().getTime()
            });

        response.json({result: 'OK'});
    }
    response.json({result: 'NOK', error: 'email_required'});

})
