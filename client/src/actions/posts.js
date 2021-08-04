import * as api from '../api';
import {FETCH_ALL,CREATE,UPDATE,LIKE,DELETE, FETCH_BY_SEARCH,START_LOADING,FETCH_POST,END_LOADING} from '../constants/actionTypes'
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: { post: data } })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}
export const getPosts = (page) => async (dispatch)=>{
    try {
        dispatch({type : START_LOADING})
        const {data}  = await api.fetchPosts(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message)        
    }
}
export const createPost = (post,history)=> async (dispatch)=>{ 
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post)
        history.push('/posts')
        dispatch({type : CREATE,payload : data})
    } catch (error) {
     console.log(error)   
    }
}
export const updatePost = (id,updatedPost)=> async(dispatch)=>{
    try {
       const {data} = await api.updatePost(id,updatedPost)
       dispatch({type : UPDATE , payload : data})
    } catch (error) {
        console.log(error.message)
    }
}
export const deletePosts = (id)=> async(dispatch)=>{
    try {
        await api.deletePost(id)
        dispatch({type : DELETE , payload : id})
    } catch (error) {
        console.log(error)
    }
}
export const likePost  = (id)=> async(dispatch)=>{
    try {
        await api.likePost(id)
        dispatch({type: LIKE, payload :id})
    } catch (error) {
        console.log(error)
    }
}
export const getPostsBySearch = (searchQuery)=> async(dispatch)=> {
        try {
            dispatch({ type: START_LOADING })
            const {data: {data}} = await api.fetchPostBySearch(searchQuery)
            dispatch({ type: FETCH_BY_SEARCH, payload: { data } })
            dispatch({ type: END_LOADING })
        } catch (error) {
            console.log(error.message)
        }
}