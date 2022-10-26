import { model, Schema } from 'mongoose';
import type { IUser } from './user';

export interface IEvent {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: IUser;
  toClient: () => IEvent;
}

export const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    start: {
      type: Date,
      require: true,
    },
    end: {
      type: Date,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    methods: {
      toClient () {
        const objData = { ...this.toObject() };
        const { _id, ...resData } = objData;

        const formattedObjData: Partial<IEvent> = {
          ...resData,
          id: _id.toString(),
        };

        return formattedObjData;
      },
    },
  }
);

export const Event = model('Event', EventSchema);
