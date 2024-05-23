exports.seed = async function (knex) {
  const members = [
    { id: 0, name: 'massa' },
    { id: 1, name: 'taro' },
    { id: 2, name: 'jiro' },
  ];

  await knex('member').del();
  await knex('member').insert(members);
};
