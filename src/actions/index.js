import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_SINGLE_POST = 'fetch_single_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=udaysaini11'

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => { callback() });    // 1st arg is URL , 2nd argument is the data we want to send.

    console.log(callback);

    const action = {
        type: CREATE_POST,
        payload : request
    };

    return action;
}

export function fetchSinglePost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type : FETCH_SINGLE_POST,
        payload : request
    }
}

export function deletePost(id, navigationCallback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => navigationCallback() );

    return {
        type : DELETE_POST,
        payload : id
    }

    //NavigationCallback is the callback we get when a user is navigated back to the main page.
}