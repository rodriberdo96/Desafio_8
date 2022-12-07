const {options} = require('./optionsMariaDb');
const knex = require('knex')(options);

(async () => {
    try {
        const exists = await knex.schema.hasTable('productos');
        if (!exists) {
            return knex.schema.createTable('productos', table => {
                table.increments('id').primary();
                table.string('title');
                table.float('price');
                table.string('thumbnail');
            })
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        knex.destroy();
    }
})();

