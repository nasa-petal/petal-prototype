import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import Data from "../golden.json";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";

const privacyPolicy = (
  <DialogContentText>
    We use a tool called “Google Analytics” to collect information about use of
    this site. Google Analytics collects information such as how often users
    visit this site, what pages they visit when they do so, and what other sites
    they used prior to coming to this site. We use the information we get from
    Google Analytics only to improve this site. Google Analytics collects only
    the IP address assigned to you on the date you visit this site, rather than
    your name or other identifying information. We do not combine the
    information collected through the use of Google Analytics with personally
    identifiable information. Although Google Analytics plants a permanent
    cookie on your web browser to identify you as a unique user the next time
    you visit this site, the cookie cannot be used by anyone but Google.
    Google’s ability to use and share information collected by Google Analytics
    about your visits to this site is restricted by the{" "}
    <Link
      href='https://www.google.com/analytics/terms/'
      target='_blank'
      rel='noreferrer'>
      Google Analytics Terms of Use
    </Link>{" "}
    and the{" "}
    <Link
      href='https://policies.google.com/privacy'
      target='_blank'
      rel='noreferrer'>
      Google Privacy Policy
    </Link>
    . You can prevent Google Analytics from recognizing you on return visits to
    this site by{" "}
    <Link
      href='http://www.usa.gov/optout_instructions.shtml'
      target='_blank'
      rel='noreferrer'>
      disabling cookies
    </Link>{" "}
    in your browser
  </DialogContentText>
);

function PrivacyDialog(props) {
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
    <div onClick={handleClickOpen}>
      {props.title}
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
        <DialogTitle>About PeTaL</DialogTitle>
        <DialogContent>
          <DialogContent style={{ overflow: "hidden" }}>
            The Periodic Table of Life (PeTaL, pronounced petal) is a design
            tool aimed at allowing users to seamlessly move from ideas (from
            nature or other sources) to design.
            <br />
            <br />
            <DialogContentText>
              The <b>Biomimicry Search</b> page allows you to search for a
              specific question regarding building a biomimetic system, and the
              result of this query is a list of relevant papers that could be
              helpful.
              <br />
              <br />
              The <b>Mechanism Search</b> page provides an interface to explore
              various ways an organism achieves a certain function.
              <br />
              <br />
              The <b>Clustering</b> page offers preliminary clustering of our
              biomimicry datset using machine learning.
            </DialogContentText>
          </DialogContent>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogContent>{props.info}</DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);
  const [button, setButton] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            <img
              src={require("../assets/images/petal2.png")}
              width={200}
              height={110}
              alt=''
            />
          </Link>
          {/* <button> Cool Button</button> */}
          <div>
            <FontAwesomeIcon
              className='fa-icon-menu'
              onClick={handleClick}
              icon={click ? faTimes : faBars}
              size='2x'
              inverse
            />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className='nav-item'>
              <Link
                to='/biomimicrysearch'
                className='nav-links'
                onClick={closeMenu}>
                Biomimicry Search
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/clustering' className='nav-links' onClick={closeMenu}>
                Clustering
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/texttoimage' className='nav-links' onClick={closeMenu}>
                Text-to-Image
              </Link>
            </li>
            {/*<li className='nav-item'>
              <Link
                to='https://petalai.org/'
                className='nav-links'
                onClick={closeMenu}>
                Mechanism Search
              </Link>
  </li>*/}
            <li className='nav-item'>
              <Link to='/reframe' className='nav-links' onClick={closeMenu}>
                Reframe Design Challenge
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-links'>
                <Container>
                  <PrivacyDialog title='About' info={privacyPolicy} />
                </Container>
              </Link>
            </li>
          </ul>

          {/* button && <Button buttonStyle='btn--outline'> Help</Button> */}
        </div>
      </nav>
      <div
        style={{
          minHeight: "100vh",
          background:
            "url(http://buildingnc.org/wp-content/uploads/Biomimicry.jpeg)",
        }}>
        <Typography variant='h2' component='h1' style={{ paddingTop: "50px" }}>
          Database Search
        </Typography>
        <SearchBar
          className='searchBar'
          placeholder='Database Search...'
          data={Data}
          search={false}
          useFilter={true}
          isImage={false}
        />
      </div>
    </>
  );
}

export default Navbar;
