import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

const BlogDetail = () => {

  const navigate= useNavigate();
  const [blog, setblog] = useState();

  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({

  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios.get(`https://my-project-backend-silk.vercel.app/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then(data => {
      setblog(data.blog);
      setInputs({ title: data.blog.title, description: data.blog.description });
    });
  }, [id]);
  console.log(blog);

  const sendRequest = async () => {
    const res = await axios
      .put(`https://my-project-backend-silk.vercel.app/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/myBlogs/"));
  };

  return (
    <div> {inputs &&
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
            fontWeight={"bold"}
            padding={3}
            color="#072f2e"
            variant="h4"
            textAlign={"center"}
          >
            Update Your Blog
          </Typography>
          <InputLabel
            sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel 
            sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
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
      </form>}
    </div>
  )
}

export default BlogDetail