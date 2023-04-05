import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilledInput from "@mui/material/FilledInput";

import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

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

const selectOptions = ["Engineering", "Biologist", "5th-grade"];

function getStyles(option, selectOption, theme) {
  return {
    fontWeight:
      selectOption.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
      <CardContent>
        <Box
          style={{ textAlign: "center" }}
          sx={{
            color: "text.primary",
            fontSize: 30,
            fontWeight: "regular",
            mb: 2,
          }}>
          {props.article.organism}
        </Box>
        <Typography component='p' color='black'>
          <u>
            <b>Strategy</b>
          </u>
          : {props.article.strategy}
        </Typography>
        <Typography sx={{ pt: 2 }} color='black' component='p'>
          <u>
            <b>Part Of</b>
          </u>
          : {props.article.partof}
        </Typography>
        <Typography sx={{ pt: 2 }} color='black' component='p'>
          <u>
            <b>Function</b>
          </u>
          : {props.article.function}
        </Typography>
        <Typography sx={{ pt: 2 }} color='black' component='p'>
          <u>
            <b>Mechanism</b>
          </u>
          : {props.article.mechanism}
        </Typography>
        <Typography sx={{ pt: 2 }} color='black' component='p'>
          <u>
            <b>Context</b>
          </u>
          : {props.article.context}
        </Typography>
      </CardContent>
    </Card>
  );
}

function MediaCardDB(props) {
  return (
    <Card
      sx={{
        margin: "auto",
        width: "60%",
        height: "100%",
        bgcolor: "grey.100",
        justifyContent: "center",
        marginBottom: "30px",
      }}>
      <CardContent>
        <Box
          style={{ textAlign: "center" }}
          sx={{
            color: "text.primary",
            fontSize: 30,
            fontWeight: "regular",
            mb: 2,
          }}>
          <Link
            color='success.dark'
            target='_blank'
            rel='noopener noreferrer'
            href={props.article.url}>
            {props.article.title}
          </Link>
        </Box>

        <Typography sx={{ pt: 2 }} color='black' component='p'>
          {props.article.abstract}
        </Typography>
      </CardContent>
    </Card>
  );
}

function SearchBar({
  placeholder,
  data,
  search,
  useFilter,
  isImage,
  isBiomimicry,
}) {
  const [filterData, setFilterData] = useState([]);
  const [isShown, setShown] = useState(false);
  const [biomimicryData, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchVal, setSearchVal] = useState([]);
  const [openEmptytext, setOpenEmptyText] = React.useState(false);

  const toggleShow = () => {
    setShown(!isShown);
  };

  const handleFilter = (event) => {
    setInputText(event.target.value);
    if (useFilter === false) {
      return;
    }
    const searchKeyWord = event.target.value;

    const tmpFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchKeyWord.toLowerCase());
    });

    if (searchKeyWord === "") {
      setFilterData([]);
    } else {
      setFilterData(tmpFilter);
    }
  };

  const handleSearch = () => {
    if (inputText === "") {
      handleClickOpen();
      return;
    }

    if (selectOption.length === 0 || selectOption[0] === "Biologist") {
      data = data[0];
    } else if (selectOption[0] === "5th-grade") {
      data = data[1];
    } else {
      data = data[2];
    }

    if (search === true) {
      setData(
        data.map((res) => (
          <Grid item xs={12} key={res.id}>
            <MediaCard article={res} />
          </Grid>
        ))
      );
    }
  };

  const clearBiomimicrySearch = () => {
    setSelectOption("");
    setInputText("");
    setData([]);
  };
  /*const articleCards = this.state.articlesToDisplay.map((article) => (
    <Grid item xs={12} key={article.SortKey.S}>
      <MediaCard article={article} />
    </Grid>
  ));*/

  const containerStyles = {
    //backgroundImage: `url(${biomimicry_ex1})`,
    width: "700px",
    height: "500px",
    paddingTop: "30px",
    margin: "0 auto",
  };
  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${data[0].url})`,
  };

  const handleSearchImage = () => {
    toggleShow();
    console.log("Image URL", data[0].url);
  };

  const clearInput = () => {
    setInputText("");
    setFilterData([]);
  };

  // for biomimicry search
  const theme = useTheme();
  const [selectOption, setSelectOption] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const themeButton = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  const searchClick = (value) => {
    setFilterData([]);
    setSearchVal(
      <Grid item xs={12} key={value.paper}>
        <MediaCardDB article={value} />
      </Grid>
    );
  };

  const clearDbSearch = () => {
    setInputText("");
    setSearchVal([]);
  };

  const handleClickOpen = () => {
    if (openEmptytext === false) {
      setOpenEmptyText(true);
    }
  };
  const handleClose = () => {
    setOpenEmptyText(false);
  };

  return (
    <div className='search'>
      <div className='searchInputs'>
        {isBiomimicry === true && (
          <div>
            <div
              style={{
                marginRight: "20px",
              }}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel
                  style={{
                    backgroundColor: "white",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    borderRadius: "5px",
                  }}
                  id='demo-multiple-name-label'>
                  Level
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
                  onChange={handleChange}
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
          </div>
        )}
        <input
          style={{ marginTop: "5px" }}
          type='text'
          placeholder={placeholder}
          value={inputText}
          onChange={handleFilter}
        />
        <div className='searchIcon'>
          {filterData.length === 0 ? (
            <SearchIcon
              id='searchBtn'
              style={{ marginTop: "5px" }}
              onClick={isImage ? handleSearchImage : handleSearch}
            />
          ) : (
            <CloseIcon id='clearBtn' onClick={clearInput} />
          )}
        </div>
      </div>

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
        <DialogTitle>Please Enter a Query!</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/*articleCards*/}
      {/*style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}}*/}

      {isShown && isImage && (
        <div style={containerStyles}>
          <div style={slideStyles}></div>
        </div>
      )}
      {useFilter === true && filterData.length !== 0 && (
        <div className='dataResultOuter'>
          <div className='dataResult'>
            {filterData.map((value, key) => {
              return (
                /*<a
                className='dataItem'
                //href={value.url}
                /*target='_blank'
                rel='noreferrer'
                onclick='return searchClick(value, key)'>*/

                <p className='dataItem' onClick={() => searchClick(value)}>
                  {value.title}
                </p>
              );
            })}
          </div>
        </div>
      )}

      <Container maxWidth='ct'>
        {searchVal.length !== 0 && (
          <Button
            onClick={clearDbSearch}
            color='primary'
            variant='contained'
            style={{ marginTop: "30px" }}>
            Clear Results
          </Button>
        )}
        <Grid
          style={{ textAlign: "left" }}
          container
          spacing={4}
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          paddingTop='30px'>
          {searchVal}
        </Grid>
      </Container>

      <Container maxWidth='ct'>
        {biomimicryData.length !== 0 && (
          <Button
            onClick={clearBiomimicrySearch}
            color='primary'
            variant='contained'>
            Clear Results
          </Button>
        )}
        <Grid
          style={{ textAlign: "left" }}
          container
          spacing={4}
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          paddingTop='30px'>
          {biomimicryData}
        </Grid>
      </Container>
    </div>
  );
}

export default SearchBar;
