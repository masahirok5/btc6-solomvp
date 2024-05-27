exports.seed = async function (knex) {
  const members = [
    { id: 0, name: 'ai' },
    { id: 1, name: 'massa' },
    { id: 2, name: 'taro' },
    { id: 3, name: 'jiro' },
  ];

  const contents = [
    {
      id: 0,
      member_id: 1,
      partner: 0,
      content: 'こんにちは',
      datetime: new Date('2024-05-01T03:24:00'),
    },
    {
      id: 1,
      member_id: 0,
      partner: 1,
      content: 'こんにちは',
      datetime: new Date('2024-05-02T03:24:00'),
    },
  ];

  await knex('chat').del();
  await knex('member').del();
  await knex('member').insert(members);
  await knex('chat').insert(contents);
};
