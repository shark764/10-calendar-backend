import { model, Schema } from 'mongoose';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  toClient: () => IUser;
}

export const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    methods: {
      toClient () {
        const objData = { ...this.toObject() };
        const { _id, ...resData } = objData;

        const formattedObjData: Partial<IUser> = {
          ...resData,
          id: _id.toString(),
        };
        delete formattedObjData.password;

        return formattedObjData;
      },
    },
  }
);

export const User = model('User', UserSchema);
