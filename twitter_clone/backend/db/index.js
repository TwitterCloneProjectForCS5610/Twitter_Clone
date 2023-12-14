import mongoose from 'mongoose';
import './user.js';
import './status.js';

export const db_uri =
  'mongodb+srv://vivianyicenliu:3bEnaQfUfsmvn3xF@cluster0.9ht4zc8.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(db_uri)
  .then(() => {
    console.log('database connected to ' + db_uri);
  })
  .catch((err) => {
    console.error(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  });
