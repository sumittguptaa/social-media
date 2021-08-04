import React, { useEffect, useState } from 'react'
import { Avatar,AppBar,Toolbar,Typography ,Button} from '@material-ui/core'
import { Link,useHistory,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import memoriesText from '../../memories.png'
import memoriesLogo from  '../../memories-Logo.png'
import useStyles from './styles'
import decode from "jwt-decode"
function Navbar() {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const logout = ()=>{
        dispatch({type : "LOGOUT",})
        history.push('/')
        setUser(null)
    }
  
    useEffect(()=>{
        const token = user?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <Link to="/" className={classes.brandContainer} >
                <img src={memoriesText} alt="memoriesText" height="45px" />
                <img className={classes.image} src={memoriesLogo} height="40px" alt="memories" />
            </Link>
           <Toolbar className={classes.toolbar} > 
           {user? (
               <div className={classes.profile} >
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                    <Typography variant="h6" className={classes.userName} >{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Log Out</Button>
               </div>
           ):(
               <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
           )}

           </Toolbar>
        </AppBar>
    )
}

export default Navbar
