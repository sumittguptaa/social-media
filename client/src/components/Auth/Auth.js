import React ,{useState}from 'react'
import { Avatar, Paper, Grid, Button, Typography, Container } from "@material-ui/core"
import {GoogleLogin} from "react-google-login"
import useStyles from './styles'
import {useDispatch} from "react-redux"
import { useHistory } from 'react-router-dom'
import Icon from './icon'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input'
import {signin,signup} from "../../actions/auth"
const initialState = {firstName: "",lastName: "",email: "",password: "",confirmPassword : ""}
function Auth() {

    const history = useHistory()
    const classes = useStyles()
    const [formdata,setFormData]= useState(initialState)
    const [isSignup,setIssignup] = useState(true);
    const dispatch = useDispatch()
    const [showPassword,setShowPassword] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formdata,history))
        }else{
            dispatch(signin(formdata, history))
        }
    }
    const handleChange = (e) => {
        setFormData({...formdata,[e.target.name] : e.target.value})
    }
    const handleShowpassword = ()=> setShowPassword((showprevPass) => !showprevPass)
    const switchMode = () =>{
        setIssignup((sign)=> !sign)
        setShowPassword(false)
    }
    const googleSuccess = async(res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: "AUTH", data: {result,token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (e)=>{
        console.log(e)
    }
    return (
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="E-Mail" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowpassword={handleShowpassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >{isSignup ? "Sign Up" : "Sign In"}</Button>
                    <GoogleLogin
                        clientId="661240217249-idstkq8vlm6lgvrc3811idsc81i8o496.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end" >
                            <Grid item >
                                <Button onClick={switchMode} >
                                    {isSignup? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
