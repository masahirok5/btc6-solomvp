const express = require('express');
const knex = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 80;

app.use('/', express.static('../frontend/dist'));

app.get('/member/:id', async (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin': '*' });
  const members = await knex('member').select('');
  res.send(members);
});

app.get('/chat/:member_id/:partner', async (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin': '*' });
  const member_id = Number(req.params.member_id);
  const partner = Number(req.params.partner);
  const contents = await knex('chat')
    .select('')
    .where({ member_id: member_id, partner: partner })
    .orWhere({ member_id: partner, partner: member_id })
    .orderBy('datetime');
  res.send(contents);
});

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.AUTHKEY,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

app.post('/chat/:member_id/:partner', async (req, res) => {
  const member_id = Number(req.params.member_id);
  const partner = Number(req.params.partner);
  const lastId = (await knex('chat').select('')).length;
  const chat = {
    id: lastId + 1,
    member_id: member_id,
    partner: partner,
    content: req.body.content,
    datetime: req.body.datetime,
  };
  await knex('chat').insert(chat);

  const inputOfText = {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'あなたはAIチャットボットです。',
      },
      {
        role: 'user',
        content: `${req.body.content}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const resOfText = await postData(
    'https://api.openai.com/v1/chat/completions',
    inputOfText
  );

  const aiLastId = (await knex('chat').select('')).length;
  const aiChat = {
    id: aiLastId + 1,
    member_id: partner,
    partner: member_id,
    content: resOfText.choices[0].message.content,
    datetime: new Date(),
  };

  await knex('chat').insert(aiChat);

  res.status(201).send('ok');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
