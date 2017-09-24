import { FETCH_POSTS, FETCH_SINGLE_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function (state = {}, action ) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);

        case FETCH_SINGLE_POST:
            // ES5
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            //return newState;
            console.log('State in Reducer', state);

            return { ...state, [action.payload.data.id] : action.payload.data };
            // We are saying fetch the new post id, make it the key and give it value of post.

        case FETCH_POSTS:
            const returnPosts = _.mapKeys(action.payload.data, 'id');
            return returnPosts;
        default:
            return state;

    }
}