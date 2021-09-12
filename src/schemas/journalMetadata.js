import { object, string } from 'yup';

const journalMetadataSchema = object().shape({
  author:
    string()
    .required(),
  date:
    string()
    .required()
});

export default journalMetadataSchema;