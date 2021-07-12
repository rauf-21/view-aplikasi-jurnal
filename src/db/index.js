import localforage from 'localforage';

const diaryCollection = localforage.createInstance({ name: 'diaryCollection' });

export { diaryCollection };