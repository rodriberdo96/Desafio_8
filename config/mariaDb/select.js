const {options} = require('./optionsMariaDb');
const knex = require('knex')(options);

async function selectProducts () {
    const products = await knex.from('productos').select('*');
    return products;
}

module.exports = selectProducts;