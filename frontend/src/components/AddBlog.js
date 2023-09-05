import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

const AddBlog = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      }).catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={"none"}
          borderRadius={5}
          boxShadow="10px 10px 20px #ccc"
          bgcolor="#d7efda"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="#072f2e"
            variant="h4"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font}
            sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel className={classes.font}
            sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="normal"
            variant="outlined"
          />
          <InputLabel className={classes.font}
            sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 2, bgcolor: "#072f2e", color: "white", marginLeft: "20%", marginRight: "20%" }}
            variant="text"
            color="inherit"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;