import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
    console.log(imageURL);
    const classes = useStyles();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`);
    };

    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate("/"))
            .then(() => navigate("/blogs"));
    };
    
    return (
        <div>
            {" "}
            <Card
                sx={{
                    bgcolor:"#d7efda",
                    width: "50%",
                    margin: "auto",
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                    },
                }}
            >
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditOutlineIcon color="inherit" />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteForeverIcon color="inherit" />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar
                            className={classes.font}
                            sx={{ bgcolor: "#017481" }}
                            aria-label="recipe"
                        >
                            {userName ? userName.charAt(0) : ""}
                        </Avatar>
                    }
                    title={<Typography variant="body1" color="#00100f">{title}</Typography>}
                />
                <CardMedia
                    component="img"
                    height="250px"
                    image={imageURL}
                    alt="failed to load image"
                />

                <CardContent>
                    <hr />
                    <br />
                    <Typography
                        className={classes.font}
                        variant="body2"
                        color="text.primary"
                    >
                        <b>{userName}</b> {": "} {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Blog;