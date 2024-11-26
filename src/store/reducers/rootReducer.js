import { combineReducers } from 'redux';
import authorized from './authorized';
import userTableRedUnixFor from './userTableRedUnixFor.js';
import subjectTableRedUnixFor from './subjectTableRedUnixFor.js';
import topicTableRedUnixFor from './topicTableRedUnixFor.js';
import progressTableRedUnixFor from './progressTableRedUnixFor.js';

const rootReducer = combineReducers({
    isAuthorize: authorized,
    userTableRedUnixFor: userTableRedUnixFor,
    subjectTableRedUnixFor: subjectTableRedUnixFor,
    topicTableRedUnixFor: topicTableRedUnixFor,
    progressTableRedUnixFor: progressTableRedUnixFor,
});

export default rootReducer;
