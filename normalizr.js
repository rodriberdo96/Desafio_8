const { normalize, schema, denormalize } = require("normalizr");
const originalData = {
    id: "999",
    posts: [
    {
        id: "123",
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
            id: "324",
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
            id: "325",
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
        id: "1123",
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
            id: "1324",
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
            id: "1325",
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
        id: "2123",
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
            id: "2324",
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
            id: "2325",
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

const user = new schema.Entity("users");
const comment = new schema.Entity("comments", {
    commenter: user,
});
const post = new schema.Entity("posts", {
    author: user,
    comments: [comment],
});
const articles = new schema.Entity("articles", {
    posts: [post],
});
const dataNormalizada = normalize(originalData, articles);
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
    articles,
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
