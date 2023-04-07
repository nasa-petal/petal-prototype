import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import {
  HelpOutline,
  KeyboardArrowDown,
  KeyboardArrowUp,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import "./Clustering.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(topic, count, name, data) {
  return {
    topic,
    count,
    name,
    data,
  };
}

function Row(props) {
  const { row, selectOption } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - row.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.topic}
        </TableCell>
        <TableCell align='right'>{row.count}</TableCell>
        <TableCell align='right'>{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Strategies
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {selectOption[0] === undefined ? "Function" : "Mechanism"}
                    </TableCell>
                    <TableCell>Strategy</TableCell>
                  </TableRow>
                </TableHead>
                {row.data.map((historyRow) => (
                  <TableBody>
                    <TableRow key={historyRow.id}>
                      <TableCell component='th' scope='row'>
                        {historyRow.Function}
                      </TableCell>
                      <TableCell>{historyRow.Strategy}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
                {/*<TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                    </TableFooter>*/}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/*Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};*/

const rowsInit = [
  createData(1, 75, "bacteria_membrane_membranes_cell", [
    {
      id: 0,
      Function: "couple or crosslink proteins",
      Strategy:
        "Transglutaminase enzymes couple or crosslink proteins in organisms by catalyzing transamidation of glutamine and lysine residues.",
    },
    {
      id: 1,
      Function: "produce polyester granuals",
      Strategy:
        "Bacterial cells produce polyester granuals in water at ambient temperature and pressure via enzymatic self-assembly.",
    },
  ]),
  createData(2, 67, "enzymes_bacteria_metabolism_carbon", [
    {
      id: 0,
      Function: "resists microorganism",
      Strategy:
        "The skin of pilot whales resists microorganisms thanks to microscopic pores and nanoridges, surrounded by a secreted enzymatic gel which denatures proteins and carbohydrates.",
    },
    {
      id: 1,
      Function: "breaking down their cell membranes",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
  ]),
  createData(3, 64, "diversity_ecosystems_species_forest", [
    {
      id: 0,
      Function: "resists microorganism",
      Strategy:
        "The skin of pilot whales resists microorganisms thanks to microscopic pores and nanoridges, surrounded by a secreted enzymatic gel which denatures proteins and carbohydrates.",
    },
    {
      id: 1,
      Function: "breaking down their cell membranes",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
  ]),
  createData(4, 61, "legs_hind_feet_locust", [
    {
      id: 0,
      Function: "resists microorganism",
      Strategy:
        "The skin of pilot whales resists microorganisms thanks to microscopic pores and nanoridges, surrounded by a secreted enzymatic gel which denatures proteins and carbohydrates.",
    },
    {
      id: 1,
      Function: "breaking down their cell membranes",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
  ]),
  createData(5, 59, "shell_sponges_proteins_threads", [
    {
      id: 0,
      Function: "resists microorganism",
      Strategy:
        "The skin of pilot whales resists microorganisms thanks to microscopic pores and nanoridges, surrounded by a secreted enzymatic gel which denatures proteins and carbohydrates.",
    },
    {
      id: 1,
      Function: "breaking down their cell membranes",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
  ]),
  createData(6, 58, "antennae_olfactory_honeybees_male", [
    {
      id: 0,
      Function: "resists microorganism",
      Strategy:
        "The skin of pilot whales resists microorganisms thanks to microscopic pores and nanoridges, surrounded by a secreted enzymatic gel which denatures proteins and carbohydrates.",
    },
    {
      id: 1,
      Function: "breaking down their cell membranes",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
  ]),
  createData(7, 55, "material_structure_university_struts", [
    {
      id: 0,
      Function: "resists microorganism",
      Strategy:
        "The skin of pilot whales resists microorganisms thanks to microscopic pores and nanoridges, surrounded by a secreted enzymatic gel which denatures proteins and carbohydrates.",
    },
    {
      id: 1,
      Function: "breaking down their cell membranes",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
  ]),
];

const rowsReduceDrag = [
  createData(1, 20, "structural_change_width", [
    {
      id: 0,
      Function: "changes in width and flatness",
      Strategy:
        "Blades of bull kelp balance drag reduction and sunlight exposure in different flow environments via changes in width and flatness.",
    },
    {
      id: 1,
      Function: "expanding surface area",
      Strategy:
        "Hairs on the whirligig beetle's middle and hind legs increase thrust by expanding surface area.",
    },
    {
      id: 2,
      Function: "folding",
      Strategy:
        "The forelegs of the whirligig beetle reduce loss of speed by folding during swimming to enhance a fluid-resistant body shape.",
    },
  ]),
  createData(2, 35, "structure_water", [
    {
      id: 0,
      Function: "whiskers with undulating surface structure",
      Strategy:
        "The highly sensitive whiskers of harbor seals reduce vortex-induced vibrations during swimming due to their undulating surface structure.",
    },
    {
      id: 1,
      Function: "manipulating fluid flow",
      Strategy:
        "Scales on sharks influence drag and thrust during swimming by manipulating fluid flow next to the body.",
    },
  ]),
];

const rowsChemicallyBreakDown = [
  createData(1, 19, "catalyze_breakdown", [
    {
      id: 0,
      Function: "Photosynthesis",
      Strategy:
        "Photosynthesis in plants makes useful organic compounds out of carbon dioxide through carbon-fixation reactions.",
    },
    {
      id: 1,
      Function: "catalyzing transamidation of glutamine and lysine residues",
      Strategy:
        "Transglutaminase enzymes couple or crosslink proteins in organisms by catalyzing transamidation of glutamine and lysine residues.",
    },
  ]),
  createData(2, 45, "breakdown_inorganic_compoounds", [
    {
      id: 0,
      Function: "Soil Mixing",
      Strategy:
        "Ants may increase carbon dioxide drawdown by enhancing mineral weathering in the soil.",
    },
    {
      id: 1,
      Function: "Nitric Oxide Synthesis",
      Strategy:
        "Bacillus subtilis defends itself against the damaging effects of oxidative free-radicals by synthesizing nitric oxide.",
    },
  ]),
  createData(3, 10, "breakdown_organic_compoounds", [
    {
      id: 0,
      Function: "Chemicals in Oregano Act as Fungicide",
      Strategy:
        "Volatile compounds found in oregano destroy fungi by breaking down their cell membranes.",
    },
    {
      id: 1,
      Function: "Bacteria Degrade Petroleum Hydrocarbons",
      Strategy:
        "Blooms of obligate hydrocarbonoclastic bacteria (OHCB) result in the rapid degradation of many oil constituents.",
    },
  ]),
  createData(4, 82, "breakdown_polymers", [
    {
      id: 0,
      Function: "Enzymes Bleach Wood Lignin",
      Strategy:
        "Enzymes produced by a marine fungus found on mangroves can bleach wood pulp by catalyzing the break down of lignin.",
    },
    {
      id: 1,
      Function: "Egg Cell Coating Blocks Extra Sperm",
      Strategy:
        "Coat surrounding egg cell of mammals rapidly hardens to block extra sperm.",
    },
  ]),
];

const rowsPhysicalState = [
  createData(1, 13, "modify_buoyancy", [
    {
      id: 0,
      Function: "Wax Density Changes",
      Strategy:
        "Antarctic crustaceans create wax within their bodies to help them sink deep into the water to hibernate for winter.",
    },
    {
      id: 1,
      Function: "Floats Keep Fronds Buoyant",
      Strategy:
        "Gas-filled floats help keep kelp fronds near the water surface to enhance photosynthesis.",
    },
  ]),
  createData(2, 34, "modify_light_color", [
    {
      id: 0,
      Function: "Protein Turns Sunlight Into Vivid Color",
      Strategy:
        "Proteins made by Discosoma mushroom anemones produce color by using the sun’s energy to generate specific wavelengths of light.",
    },
    {
      id: 1,
      Function: "Camouflage",
      Strategy:
        "The skin of cuttlefish changes color rapidly using elastic pigment sacs called chromatophores, in order to evade predators.",
    },
  ]),
  createData(3, 70, "modify_positions", [
    {
      id: 0,
      Function: "Molecular Caps",
      Strategy:
        "Microtubules fray when protective molecules degrade, then grow again when they reform.",
    },
    {
      id: 1,
      Function: "360° Vision",
      Strategy:
        "The eyes of the chameleon provide 360-degree vision due to unique eye anatomy and an ability to transition between monocular and binocular vision.",
    },
  ]),
];

const help = (
  <DialogContentText>
    Preliminary Clustering of our data using Machine Learning.
    <br />
    <br />
    Use the dropdown to select a specific function, the result will show a
    clustering based on the mechanisms of that strategy.
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
        color='error'
        variant='outlined'
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

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

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

const selectOptions = [
  "Reduce Drag",
  "Chemically Break Down",
  "Modify Physical State",
];

function getStyles(option, selectOption, theme) {
  return {
    fontWeight:
      selectOption.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Clustering() {
  const [imageDist, setImageInterTopicDistShown] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();
  const [selectOption, setSelectOption] = React.useState([]);
  const [rows, setRows] = React.useState(rowsInit);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const showInterTopicDiv = () => {
    setImageInterTopicDistShown(true);
  };
  const HideInterTopicDiv = () => {
    setImageInterTopicDistShown(false);
  };

  const handleChangeOption = (event) => {
    const {
      target: { value },
    } = event;
    setSelectOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (value === "Modify Physical State") {
      setRows(rowsPhysicalState);
    } else if (value === "Reduce Drag") {
      setRows(rowsReduceDrag);
    } else if (value === "Chemically Break Down") {
      setRows(rowsChemicallyBreakDown);
    } else {
      setRows(rowsInit);
    }
  };

  return (
    <div
      style={{
        paddingTop: "50px",
        minHeight: "100vh",
        background:
          "url(https://images.fineartamerica.com/images-medium-large-5/morpho-butterfly-scales-er-degginger.jpg)",
      }}>
      <WhiteTextTypography variant='h2' component='h1'>
        Clustering
      </WhiteTextTypography>
      <div className='row'>
        <div className='columnLeft'>
          <img
            className='intertopicDistFig'
            width={500}
            height={250}
            src='https://nasa-petal.github.io/petal-prototype/images/Ex_intertopic_Dist.png'
            alt=''
            onClick={() => showInterTopicDiv()}
          />
        </div>
        <div className='columnRight'>
          <FormControl sx={{ width: 200 }}>
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
          <div width={500} height={250} className='dataGrid'>
            <TableContainer component={Paper}>
              <Table
                aria-label='collapsible table'
                pageSize={5}
                rowsPerPageOptions={[5]}>
                <TableHead>
                  <TableRow>
                    {/*<TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      rowsPerPage={5}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                    />*/}
                    <TableCell />
                    <TableCell>Topic</TableCell>
                    <TableCell align='right'>Count</TableCell>
                    <TableCell align='right'>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <Row key={row.name} row={row} selectOption={selectOption} />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      {imageDist && (
        <div>
          <img src='https://nasa-petal.github.io/petal-prototype/Ex_topic_freq.png' alt='' />
          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <Button
              variant='outlined'
              color='warning'
              onClick={() => HideInterTopicDiv()}>
              Hide
            </Button>
          </div>
        </div>
      )}
      <Container>
        <Help title='Help' info={help} />
      </Container>
    </div>
  );
}

export default Clustering;
