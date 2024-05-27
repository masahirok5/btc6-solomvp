exports.up = async (knex) => {
  await knex.schema.createTable('chat', (table) => {
    table.increments('id').primary();
    table.integer('member_id');
    table.foreign('member_id').references('id').inTable('member');
    table.integer('partner');
    table.text('content');
    table.datetime('datetime');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('chat');
};
