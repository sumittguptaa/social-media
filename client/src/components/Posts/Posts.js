import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import {Grid} from "@material-ui/core"
import useStyles from './styles'
import { CircularProgress } from '@material-ui/core';

function Posts({setCurrentId}) {
    const classes = useStyles()
    const {isLoading,posts} = useSelector((state) => state.posts);
    if (!posts?.length && !isLoading) return 'No posts';
    return (
       isLoading ? <CircularProgress/> :(
           <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3} >
                {posts.map((post)=>(
                    <Grid item key={post._id} xs={12} sm={12} lg={6} xl={3} >
                            <Post post={post}  setCurrentId={setCurrentId} />
                    </Grid>
                ))}
           </Grid>
       )
    )
}

export default Posts
