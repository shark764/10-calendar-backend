import { connect } from 'mongoose';

export const dbConnection = async () => {
  try {
    const stringConnection = process.env.DATABASE_URL ?? '';
    await connect(stringConnection);
    console.log('⚡️[database]: Successfully connected to database');
  } catch (error) {
    console.error(error);
    throw new Error('Error when attempted to initialize database');
  }
};
