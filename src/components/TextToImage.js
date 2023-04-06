import React from "react";
import { useState } from "react";
import { ArrowLeft } from "@material-ui/icons";
import { ArrowRight } from "@material-ui/icons";
import Button from "@mui/material/Button";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  HelpOutline,
} from "@material-ui/icons";
import SearchBar from "./SearchBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";
import { Link } from "@mui/material";
const help = (
  <DialogContentText>
    This page contains examples of prompts, with possible outputs from
    text-to-image-models, like DALL-E. Note these images are not actual outputs
    from the model.
    <br />
    <br />
    <Link href='https://medium.com/mlearning-ai/10-best-free-to-use-text-to-image-generators-25743b3a5d50'>
      Here
    </Link>
    &nbsp; is a link to an article listing some free to use models.
  </DialogContentText>
);

function Help(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (open === false) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color='primary'
        variant='outlined'
        endIcon={<HelpOutline />}
        style={{ marginLeft: "30px", marginBottom: "20px" }}
        onClick={handleClickOpen}>
        {props.title}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        style={{
          height: "800px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}>
        <DialogTitle>Help</DialogTitle>
        <DialogContent>
          <DialogContent>{props.info}</DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
  };
  const leftArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const rightArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const dotsContainer = {
    display: "flex",
    justifyContent: "center",
  };
  const dots = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };

  const Prev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const Next = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div style={sliderStyles}>
      <div style={leftArrow}>
        <ArrowLeft fontSize='large' onClick={Prev} />
      </div>
      <div style={rightArrow}>
        <ArrowRight fontSize='large' onClick={Next} />
      </div>
      <div>
        <Typography sx={{ pt: 2 }} variant='h6' color='primary'>
          <u>
            <b>Prompt</b>
          </u>
          : {slides[currentIndex].prompt}
        </Typography>
      </div>
      <div style={slideStyles} />

      <div style={dotsContainer}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dots}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}>
            •
          </div>
        ))}
      </div>
    </div>
  );
};

const TextToImage = () => {
  const [isShown, setShown] = useState(false);

  const slides = [
    {
      url: "./images/trunk.jpg",
      title: "Trunk",
      prompt: "Create a flexible robot based on an elephant's trunk.",
    },
    {
      url: "./images/bird.jpeg",
      title: "Bird",
      prompt:
        "Peregrine falcon's have a maximum diving speed of 240 mph. Develop a plane based off its body to have the same characteristic.",
    },
    {
      url: "./images/biomimicry_ex2.jpeg",
      title: "Wing",
      prompt:
        "Could an aircraft's wings be designed on an organism's wings or fins?",
    },

    {
      url: "./images/biomimicry_ex1.jpeg",
      title: "Kingfisher",
      prompt:
        "Design a plan to build an aerodynamic train based off a kingfisher's beak. It should have the style of a mechanical engineering diagram with a blue background.",
    },
  ];
  const containerStyles = {
    //backgroundImage: `url(${biomimicry_ex1})`,
    width: "700px",
    height: "500px",
    paddingTop: "50px",
    margin: "0 auto",
    justifyContent: "center",
  };

  const toggleShow = () => {
    setShown(!isShown);
  };

  return (
    <div
      style={{
        paddingTop: "50px",
        minHeight: "100vh",
        background:
          "url(https://mcadsustainabledesign.com/wp-content/uploads/2016/03/13805669085_319d2045c8_k.jpg)",
      }}>
      <Typography variant='h2' component='h1'>
        Text-To-Image
      </Typography>
      <div style={containerStyles}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            variant='contained'
            endIcon={isShown ? <RemoveCircleOutline /> : <AddCircleOutline />}
            style={{ marginBottom: "20px" }}
            onClick={() => toggleShow()}>
            Examples
          </Button>

          <Help title='Help' info={help} />
        </div>
        {isShown && <ImageSlider slides={slides} />}
      </div>
    </div>
  );
};

export default TextToImage;
