import React from "react";
import SearchBar from "./SearchBar";
import biologistData from "../biologyStratData.json";
import gradeData from "../5thgradeStratData.json";
import engineeringData from "../engineeringStratData.json";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  HelpOutline,
} from "@material-ui/icons";

const help = (
  <DialogContentText>
    Please enter a biomimetic question in the search bar. Ex: How would you
    build a flexible robot based on an organism?
    <br />
    <br />
    The result will be a biological strategy, which is a characteristic,
    mechanism, or process that an organism or ecosystem exhibits to accomplish a
    particular function within a particular context.
    <br />
    <br />
    The main elements of a biological strategy are: <br />- The <b>
      function
    </b>{" "}
    of the organism, as in what is the organism trying to accomplish?
    <br /> - The <b>mechanism</b> of the organism, describe how the organism
    does the function.
    <br /> - The <b>context</b> of the organism performing the function. This
    could be a place, condition, or situation.
    <br /> - The <b>organism</b> or ecosystem is performing the function.
    <br /> - The <b>part of</b> the organism that is used to perform the
    function if it is stated in the text.
    <br />
    <br />
    The select menu is used for choosing the sophistication of the strategy
    result with respect to a certain community. An Engineering level strategy
    may focus on the structural aspect of a strategy, while a 5th-grade level
    strategy would be more simplistic to aid in understanding.
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
        variant='contained'
        endIcon={<HelpOutline />}
        style={{ marginBottom: "20px", marginTop: "20px" }}
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

function BiomimicrySearch() {
  return (
    <div
      style={{
        paddingTop: "50px",
        minHeight: "100vh",
        background:
          "url(https://images.squarespace-cdn.com/content/v1/569fe605a12f449e1bf3cc20/1582068724800-B7UC1HLL8DVVLU5NFYCR/biomimicry+design+banner+image.jpeg?format=2500w)",
      }}>
      <Typography variant='h2' component='h1'>
        Biomimicry Search
      </Typography>

      {/*<div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
      </div>*/}

      <SearchBar
        className='searchBar'
        placeholder='Type a Bimomimetics Question'
        data={[biologistData, gradeData, engineeringData]}
        search={true}
        useFilter={false}
        isImage={false}
        isBiomimicry={true}
      />

      <Container>
        <Help title='Help' info={help} />
      </Container>
    </div>
  );
}

export default BiomimicrySearch;
