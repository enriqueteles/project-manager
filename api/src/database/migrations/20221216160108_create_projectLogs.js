const connection = require('../connection');

exports.up = function(knex) {
    return knex.schema.createTable('projectLogs', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw(connection.uuidGenerationRaw));
        table.string('description').notNullable();
        table.string('projectId')
            .notNullable()
            .references('id')
            .inTable('users');
        table.string('createdBy')
            .notNullable()
            .references('id')
            .inTable('users');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projectLogs');
};
