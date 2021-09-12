import { object, string } from 'yup';

const journalActivityaSchema = object().shape({
  start:
    string()
    .required(),
  end:
    string()
    .required(),
  task:
    string()
    .required()
});

export default journalActivityaSchema;