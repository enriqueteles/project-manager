const connection = require('../connection');

exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw(connection.uuidGenerationRaw));
        table.string('name').notNullable();
        table.string('description').defaultTo(null);
        table.string('createdBy')
            .notNullable()
            .references('id')
            .inTable('users');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('events');
};
