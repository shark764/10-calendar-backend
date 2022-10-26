import type { Request, Response } from 'express';

export const getEvents = (req: Request, res: Response) => {
  const events = [{ id: '1234', name: 'My Name' }];
  console.log(req);

  res.json({
    ok: true,
    message: 'fetched',
    data: events,
  });
};

export const createEvent = (req: Request, res: Response) => {
  console.log('CREATE EVENT', req.body);

  res.json({
    ok: true,
    message: 'created',
    data: {
      ...req.body,
    },
  });
};

export const updateEvent = (req: Request, res: Response) => {
  console.log('UPDATE EVENT', req.params.id);
  res.json({
    ok: true,
    message: 'updated',
    data: {
      ...req.body,
      id: req.params.id,
    },
  });
};

export const deleteEvent = (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'updated',
    data: {
      id: req.params.id,
    },
  });
};
