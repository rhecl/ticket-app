import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

import { Ticket } from '../../models/ticket';

const createTicket = async () => {
  const title = 'test';
  const price = 20;

  const ticket = Ticket.build({
    title,
    price,
    userId: 'fakeuserid',
  });

  await ticket.save();
};

it('returns the ticket if the ticket is found', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(`/api/tickets`).send().expect(200);

  expect(response.body.length).toEqual(3);
});
