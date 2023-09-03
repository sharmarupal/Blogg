import React from 'react'
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../store'

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    return (
        <AppBar position='sticky' sx={{ background: "linear-gradient(90deg, rgba(7,47,46,1) 0%, rgba(1,116,129,1) 85%)" }}>
            <Toolbar>
                <Typography variant='h4'>Blogg</Typography>
                <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor='inherit' >
                        <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                        {isLoggedIn && <>
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" /> </>}
                    </Tabs>
                </Box>
                <Box display="flex" marginLeft="auto">

                    {!isLoggedIn && <>
                    <Button LinkComponent={Link} to="/login" variant='text' sx={{ margin: 1, borderRadius: 2 }} style={{ color: 'white' }}>
                        Login
                    </Button>
                    <Button LinkComponent={Link} to="/signup" variant='text' sx={{ margin: 1, borderRadius: 2 }} style={{ color: 'white' }}>
                        Signup
                    </Button></>
                    }

                    {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to="/login" variant='text' sx={{ margin: 1, borderRadius: 2 }} style={{ color: 'white' }}>
                        Logout
                    </Button>}

                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header