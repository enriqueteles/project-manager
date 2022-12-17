const connection = require('../connection');

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.uuid("id").primary().defaultTo(knex.raw(connection.uuidGenerationRaw));
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
