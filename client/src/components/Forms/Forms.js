import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from "@material-ui/core"
import FileBase from "react-file-base64"
import {useDispatch} from "react-redux"
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPost ,updatePost} from '../../actions/posts'
function Forms({currentId,setCurrentId}) {
    const history = useHistory()
    const [postData, setPostdata] = useState({
        title: "", message: "", tags: "", selectedFile: ""
    })
    const dispatch  = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles()
    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}))
        }else{
        dispatch(createPost({...postData, name : user?.result?.name},history))
      
    }
    clear()
    }
    const clear = () =>{
        setCurrentId(null)
        setPostdata({
          title: "", message: "", tags: "", selectedFile: ""
        })
    }
    const post = useSelector((state) => currentId ? state.posts.posts.find((p)=> p._id === currentId): null)
    useEffect(()=>{
        if(post) {
            setPostdata(post)
        }
    },[post])
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper} >
                <Typography variant="h6" align="center" >
                    Please Sign in to like the memories and create your own memories
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper} elevation={6} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6" >{currentId? "Editing" : "Creating" } a Memory</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => { setPostdata({ ...postData, title: e.target.value }) }}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => { setPostdata({ ...postData, message: e.target.value }) }}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => { setPostdata({ ...postData, tags: e.target.value.split(",") }) }}
                />
                <div className={classes.fileInput} >
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=> setPostdata({...postData,selectedFile : base64}) }
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    )
}

export default Forms
