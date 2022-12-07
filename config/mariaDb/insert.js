const {options} = require('./optionsMariaDb');
const knex = require('knex')(options);

async function insertProduct (product) {
    await knex('productos').insert(product);
        then (() => console.log('Producto insertado'))
}

module.exports = insertProduct;