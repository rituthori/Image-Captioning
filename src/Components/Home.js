import React, { useEffect, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { IconButton, Typography, styled, useStepContext } from "@mui/material";
import Card from "@mui/material/Card";
import { Button, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import $ from "jquery";
import "./Home.css";
import SendIcon from "@mui/icons-material/Send";
import Typing from "react-typing-animation";
import ReactTypingEffect from "react-typing-effect";
const host = "http://localhost:5000";
const Input = styled("input")({
  display: "none",
});
// '#fff176'

export default function Home() {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    setUploadedFile(e.target.files[0]);

    setImageName(imageFile.name);

    let reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(imageFile);
  };

  useEffect(() => {
    if (image === "") {
      setShowImage(false);
    } else {
      setShowImage(true);
    }
    setShowResults(false);
    setShowLoading(false);
  }, [image, imageName]);

  const removeResults = () => {
    setShowResults(false);
    setShowLoading(false);
  };

  const handleResults = async () => {
    setShowLoading(true);

    let url = `${host}/after`;
    console.log("url: ", url);

    var formdata = new FormData();
    formdata.append("file1", uploadedFile);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setPrediction(result);
        setShowLoading(false);
        setShowResults(true);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div id="head">
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2} alignItems="right" justifyContent="right">
              <img
                src="/images/vitlogo.png"
                alt=""
                style={{ width: "95%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={7}>
              <div id="heading">
                <Typography
                  gutterBottom
                  variant="h1"
                  align="center"
                  sx={{
                    mx: "auto",
                    fontFamily: "raleway-bold",
                    fontWeight: "800",
                    fontSize: "4rem",
                  }}
                >
                  B.Tech Project 2022
                </Typography>
              </div>
              <div id="subheading" style={{ padding: "auto" }}>
                <Typography
                  gutterBottom
                  variant="h2"
                  align="center"
                  sx={{
                    mx: "auto",
                    fontFamily: "raleway-regular",
                    fontWeight: "400",
                    fontSize: "2rem",
                  }}
                >
                  Image Captioning
                </Typography>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      </div>

      <Divider variant="middle" />

      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                onChange={handleImage}
                type="file"
              />
              <Button
                variant="contained"
                size="large"
                component="span"
                alignItems="center"
                endIcon={<UploadIcon />}
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              align="center"
              size="large"
              endIcon={<SendIcon />}
              disabled={!showImage}
              onClick={handleResults}
            >
              Caption Image
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Box m={1} display="flex" justifyContent="left" alignItems="left"></Box>
      </div>

      <div className="displayimage">
        {showImage ? (
          <Box
            sx={{ my: 3, mx: 2 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={image}
              alt=""
              style={{ width: "20rem", height: "auto" }}
            />
          </Box>
        ) : null}
        <>
          {showResults ? (
            <>
              {/* <Typing speed={50} hideCursor> */}
              <div style={{ margin: "3rem auto" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  align="center"
                  sx={{
                    mx: "auto",
                    fontFamily: "raleway-bold",
                    fontWeight: "600",
                    fontSize: "2rem",
                  }}
                >
                  {prediction}
                </Typography>
              </div>
              {/* </Typing> */}
            </>
          ) : showLoading ? (
            <div id="load-spin">
              <CircularProgress
                color="primary"
                variant={"indeterminate"}
                thickness={6}
                size={100}
              />
            </div>
          ) : null}
        </>
      </div>
    </>
  );
}
