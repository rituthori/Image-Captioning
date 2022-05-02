import React,{useEffect, useState} from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton, Typography, styled } from '@mui/material';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import StartIcon from '@mui/icons-material/Start';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import $ from 'jquery';
import './Home.css'
import hindijson from '../Hindi_Alphabets'
// import LoadingSpin from "react-loading-spin";
const host = "http://localhost:5000";
const Input = styled('input')({
  display: 'none',
});

export default function Home() {

  const [image,setImage] = useState("");
  const [imageName,setImageName] = useState("")
  const [showImage, setShowImage] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [prediction, setPrediction] = useState(-1)
  const [showLoading, setShowLoading] = useState(false)

  const handleImage = (e) => {
    const imageFile = e.target.files[0]; 
    
    setImageName(imageFile.name)

    let reader = new FileReader();

    reader.onloadend = () => {
        setImage(reader.result);
        
    }

    reader.readAsDataURL(imageFile);
  }

  useEffect(() => {
    if(image === "") {
      setShowImage(false);
    } else {
      setShowImage(true);
    }
    setShowResults(false)
    setShowLoading(false)
  },[image,imageName])

  const removeImage = () => {
    setShowImage(false);
    setImage("");
    setImageName("");
    removeResults()
  }

  const removeResults = () => {
    setShowResults(false);
    setShowLoading(false);
  }

  const handleResults = async() => {

    setShowLoading(true);
    let url = `${host}/api/?filename=${imageName}`;
    console.log('url: ',url)
 
    console.log('image: ', image)
    console.log('image name: ',imageName)

    // let jsondata = {image_data: imageName};
    // console.log(JSON.stringify(jsondata));
    var response = await $.ajax({
      mode: 'no-cors',
      type: 'POST',
      url: url,
      // body: JSON.stringify(jsondata),
      contentType: "application/json",
      dataType: "json",
      success: function(resultData) { console.log("Results ready to display") }
    }).catch(err => {
      console.log('fetch err: ', err)
    });

    console.log('response: ',response)
    setPrediction(response.result);

    setShowResults(true);
  }

  return (
    <>
        <div id="heading">
          <Typography gutterBottom variant="h5" sx={{mb:"2%", mt: "2%", color:"#eceff1"}}>
              Upload Character Image to start...
          </Typography>
        </div>
        <div className="container">
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" onChange={handleImage} type="file" />
            <IconButton id="fileiconbutton" disableRipple={true} aria-label="upload picture" component="span">
                <FileUploadIcon id="fileupload" sx={{ color: '#82b1ff', width: '18%', height: 'auto'}} />
            </IconButton>
          </label>
        </div>

        <div className="displayimage">
              {showImage ? <><Grid container spacing={2}>
        <Grid item xs={5} sx={{maxWidth: "100%"}}>
          <Card sx={{ maxWidth: 220, margin: 'auto', border: '2px solid #eceff1' }}>
      <CardMedia
        component="img"
        width="80"
        height="200"
        image={image}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="Start Recognition" onClick={handleResults}>
          <StartIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={removeImage}>
          <DeleteIcon />
        </IconButton>
          </CardActions>
    </Card>
        </Grid>
       {showResults ?  <><Grid item xs={2} sx={{maxWidth: "100%"}}>
          <IconButton sx={{ maxWidth: "100%", maxHeight: 'auto' }}>
            <ArrowForwardIcon sx={{color: 'green', width: '100%', height: '40%', mt: '65%'}} />
          </IconButton>
        </Grid><Grid item xs={5} sx={{maxWidth: "100%"}}>
          <Card sx={{ maxWidth: 220, margin: 'auto', border: '3px solid #ffff00' }}>
          {/* #795548 */}
      <Typography variant="h1" component="div" sx={{fontWeight: "bold", fontSize: '690%' }} align="center" mt={4} mb={5} gutterBottom>
        {hindijson[prediction]}
      </Typography>
      <CardActions disableSpacing>
        <IconButton aria-label="delete" onClick={removeResults}>
          <DeleteIcon />
        </IconButton>
          </CardActions>
    </Card>
        </Grid></>: (showLoading) ? <div className="load-spin" style={{margin: '8% auto'}}>
        {/* <LoadingSpin
            duration="2s"
            width="10px"
            timingFunction="ease-in-out"
            direction="normal"
            size="70px"
            primaryColor="green"
            secondaryColor="#333"
            numberOfRotationsInAnimation={2}
        /> */}
        <CircularProgress color="primary" variant={"indeterminate"} thickness={6} size={100} />
    </div>: null}
      </Grid></> : null}
                
          </div>
    </>
  )
}
