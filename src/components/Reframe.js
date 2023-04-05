import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { HelpOutline } from "@material-ui/icons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@mui/material/styles";

const WhiteTextTypography = withStyles({
  root: {
    color: "#000000",
  },
})(Typography);

const help = (
  <DialogContentText>
    Please enter a design challenge. The result will be a series of reframed
    challenges in terms of a biomimetic perspective.
    <br />
    <br />
    Examples:
    <br />
    - "How would you design a flying car?"
    <br />- "How would you antifog a space helmet?"
    <br />
    <br />
    Once you have submitted the design challenge, the search results returned
    can have variety of complexities. Level 1 results look at the bigger picture
    and Level 2 results are more fine-grained.
  </DialogContentText>
);

function MediaCard(props) {
  return (
    <Card
      sx={{
        margin: "auto",
        width: "60%",
        height: "100%",
        bgcolor: "grey.100",
        justifyContent: "center",
      }}>
      <CardContent>{props.article}</CardContent>
    </Card>
  );
}

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
        color='error'
        variant='contained'
        endIcon={<HelpOutline />}
        style={{ marginBottom: "20px" }}
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

const flyingCarInp = "How would you design a flying car?";
const flyingCarData = [
  "How would you minimize traffic pollution?",
  "How would you lower emissions?",
  "How would you free up roads?",
  "How would you shorten travel distances?",
];
const flyingCarDataFinerData = [
  "How would you designate areas for flying cars to park?",
  "How would you consider the noise pollution created by flying cars?",
  "How would you conduct training for drivers new to flying cars?",
];

const antifogSpaceInp = "How would you antifog a space helmet?";
const spaceData = [
  "How would you keep clear visibility for the astronaut wearing the helmet?",
  "How would you minimize water intrusion?",
  "How would you maintain surface protection?",
];

const spaceFinerData = [
  "How can you minimize water vapor in exhaled air?",
  "How can you minimize moisture in the air inside the helmet?",
];

const selectOptions = ["Level 1", "Level 2"];

function getStyles(option, selectOption, theme) {
  return {
    fontWeight:
      selectOption.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Reframe() {
  const [designData, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [openEmptytext, setOpenEmptyText] = React.useState(false);
  const [selectOption, setSelectOption] = React.useState("Level 1");
  const theme = useTheme();

  const SELECT_ITEM_HEIGHT = 48;
  const SELECT_ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: SELECT_ITEM_HEIGHT * 4.5 + SELECT_ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const clearDesignData = () => {
    setInputText("");
    setData([]);
  };

  const setDesignData = () => {
    var data = "";
    if (inputText === "") {
      handleClickOpen();
    } else if (inputText === flyingCarInp) {
      data = flyingCarData;
    } else if (inputText === antifogSpaceInp) {
      data = spaceData;
    }

    setData(
      data.map((res) => (
        <Grid item xs={12}>
          <MediaCard article={res} />
        </Grid>
      ))
    );
  };

  const handleChangeOption = (event) => {
    const {
      target: { value },
    } = event;
    setSelectOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    var data = "";
    if (value === "Level 1" && inputText === flyingCarInp) {
      data = flyingCarData;
    } else if (value === "Level 2" && inputText === flyingCarInp) {
      data = spaceFinerData;
    } else if (value === "Level 1" && inputText === antifogSpaceInp) {
      data = spaceData;
    } else if (value === "Level 2" && inputText === antifogSpaceInp) {
      data = flyingCarDataFinerData;
    }

    setData(
      data.map((res) => (
        <Grid item xs={12}>
          <MediaCard article={res} />
        </Grid>
      ))
    );
  };

  const handleClickOpen = () => {
    if (openEmptytext === false) {
      setOpenEmptyText(true);
    }
  };
  const handleClose = () => {
    setOpenEmptyText(false);
  };

  const changeInputText = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div
      style={{
        paddingTop: "50px",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        background:
          "url(https://www.talesbytrees.com/wp-content/uploads/leaves-3045796_1280-e1526284671835.jpg)",
      }}>
      <WhiteTextTypography variant='h2' component='h1'>
        Reframe Design Challenge
      </WhiteTextTypography>

      <TextField
        id='outlined-multiline-static'
        label='Type Challenge Here'
        style={{
          marginTop: "50px",
          width: "50%",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        multiline
        rows={4}
        variant='filled'
        onChange={changeInputText}
        value={inputText}
      />

      <Container style={{ marginTop: "20px" }}>
        <Button variant='contained' onClick={setDesignData}>
          Reframe
        </Button>
      </Container>

      <Dialog
        open={openEmptytext}
        onClose={handleClose}
        style={{
          height: "800px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}>
        <DialogTitle>Please Type a Design Challenge!</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth='ct' sx={{ mb: 3 }}>
        {designData.length !== 0 && (
          <div style={{ marginTop: "30px" }}>
            <Button
              onClick={clearDesignData}
              color='primary'
              variant='contained'
              style={{
                marginTop: "20px",
              }}>
              Clear Results
            </Button>

            <FormControl
              sx={{ width: 200 }}
              style={{ marginLeft: "20px", marginTop: "10px" }}>
              <InputLabel
                style={{
                  backgroundColor: "white",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                  borderRadius: "5px",
                }}
                id='demo-multiple-name-label'>
                Function
              </InputLabel>
              <Select
                style={{
                  height: "50px",
                  backgroundColor: "white",
                  marginBottom: "30px",
                }}
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                value={selectOption}
                onChange={handleChangeOption}
                input={<OutlinedInput label='Name' />}
                MenuProps={MenuProps}>
                {selectOptions.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    style={getStyles(option, selectOption, theme)}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        <Grid
          style={{ textAlign: "left" }}
          container
          spacing={4}
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          paddingTop='30px'>
          {designData}
        </Grid>
      </Container>

      <Container style={{ marginTop: "20px" }}>
        <Help title='Help' info={help} />
      </Container>
    </div>
  );
}

export default Reframe;
