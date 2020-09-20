import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

import { Ticket } from '../../models/ticket';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'test';
  const price = 20;

  const ticket = Ticket.build({
    title,
    price,
    userId: 'fakeuserid',
  });

  await ticket.save();

  const response = await request(app)
    .get(`/api/tickets/${ticket._id}`)
    .send()
    .expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
