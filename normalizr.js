const { normalize, schema, denormalize } = require("normalizr");
const originalData = {
    id: "999",
    posts: [
    {
        email: "rodriberdomas@gmail.com",
        author: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
        },
        title: "My awesome blog post",
        comments: [
        {
            email: "javierberdomas@gmail.com",
            commenter: {
                id: "2",
                nombre: "Nicole",
                apellido: "Gonzalez",
                DNI: "20442638",
                direccion: "CABA 456",
                telefono: "1567811543",
            },
        },
        {
            email: "santiago@gmail.com",
            commenter: {
                id: "3",
                nombre: "Pedro",
                apellido: "Mei",
                DNI: "20446938",
                direccion: "CABA 789",
                telefono: "1567291542",
            },
        },
        ],
    },
    {
        email: "rodri123@gmail.com",
        author: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
        },
        title: "My awesome blog post",
        comments: [
        {
            email: "javi456@gmail.com",
            commenter: {
                id: "1",
                nombre: "Pablo",
                apellido: "Perez",
                DNI: "20442654",
                direccion: "CABA 123",
                telefono: "1567876547",
            },
        },
        {
            email: "rodriberdomas@gmail.com",
            commenter: {
                id: "3",
                nombre: "Pedro",
                apellido: "Mei",
                DNI: "20446938",
                direccion: "CABA 789",
                telefono: "1567291542",
            },
        },
        ],
    },
    {
        email: "rodriberdomas@gmail.com",
        author: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
        },
        title: "My awesome blog post",
        comments: [
        {
            email: "nicole48@gmail.com",
            commenter: {
                id: "2",
                nombre: "Nicole",
                apellido: "Gonzalez",
                DNI: "20442638",
                direccion: "CABA 456",
                telefono: "1567811543",
            },
        },
        {
            email: "pablito96@gmail.com",
            commenter: {
                id: "1",
                nombre: "Pablo",
                apellido: "Perez",
                DNI: "20442654",
                direccion: "CABA 123",
                telefono: "1567876547",
            },
        },
        ],
    },
],
};

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMensaje = new schema.Entity('comments', { author: schemaAuthor }, { idAttribute: 'id' })

const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize({ id: 'mensajes', mensajes: mensajesConId }, schemaMensajes)
console.log("Datos normalizados: ", dataNormalizada);

const util = require("util");

function printData(data) {
    console.log(util.inspect(data, false, 12, true));
}
printData(dataNormalizada);

console.log(
    JSON.stringify(originalData).length,
    JSON.stringify(dataNormalizada).length
);

const dataOriginal = denormalize(
    dataNormalizada.result,
    schemaMensajes,
    dataNormalizada.entities
);
printData(dataOriginal);

function porcentaje(uno, dos) {
  const porcentajes = Math.round(100 - (uno * 100) / dos);
    console.log("porcentaje de compresión del proceso de normalización: " ,porcentajes, "%");
}
porcentaje(
    parseInt(JSON.stringify(dataNormalizada).length),
    parseInt(JSON.stringify(originalData).length)
);
