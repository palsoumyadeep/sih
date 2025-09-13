exports.up = async function(knex) {
  await knex.schema.createTable('students', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });

  await knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });

  await knex.schema.createTable('internships', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('title').notNullable();
    table.text('description');
  });

  await knex.schema.createTable('student_profiles', (table) => {
    table.increments('id').primary();
    table.integer('student_id').references('id').inTable('students');
    table.string('major');
    table.integer('year');
    table.text('resume');
  });

  await knex.schema.createTable('allocations', (table) => {
    table.increments('id').primary();
    table.integer('student_id').references('id').inTable('students');
    table.integer('internship_id').references('id').inTable('internships');
    table.unique(['student_id', 'internship_id']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('allocations');
  await knex.schema.dropTableIfExists('student_profiles');
  await knex.schema.dropTableIfExists('internships');
  await knex.schema.dropTableIfExists('companies');
  await knex.schema.dropTableIfExists('students');
};
