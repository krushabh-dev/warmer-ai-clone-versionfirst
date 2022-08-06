import * as React from "react";
import { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone";
import HighlightAltTwoToneIcon from "@mui/icons-material/HighlightAltTwoTone";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import CommentBankTwoToneIcon from "@mui/icons-material/CommentBankTwoTone";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { uuid } from "../../Config/GenrateUID";
import { auth, db } from "../../Config/fire";
import { ref, set } from "firebase/database";
import { getDatabase, child, get } from "firebase/database";

import Appbar from "./Appbar";
import "../../Assets/Styles/newemailstep.css";
import { WarningSection } from "./NewEmail";

const steps = ["Who We Are", "Goal", "Personalization Type"];

const captions = [
  "What are we pitching?",
  "What should this email to lead to?",
  "Personalize using LinkedIn or Website?",
];

const Goals = [
  [
    1,
    <CalendarTodayTwoToneIcon />,
    "Book a meeting",
    "I want to arrange a call with this person",
  ],
  [
    2,
    <HighlightAltTwoToneIcon />,
    "Click a link",
    "I'm trying to get the person to click a website link",
  ],
  [
    3,
    <HelpTwoToneIcon />,
    "Ask a question",
    "I want to find the answer to a question",
  ],
  [
    4,
    <CommentBankTwoToneIcon />,
    "Gauge interest",
    "I'm trying to assess if this is something the person is interested in",
  ],
];

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

function EmailStepsWizard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [entitylist, setEntitylist] = useState([]);
  const [newDraft, setNewDraft] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    const dbRef = ref(getDatabase());
    get(child(dbRef, `entity/${auth.currentUser.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        var res = [];
        snapshot.forEach(function (data) {
          res.push(data.val())
        })
        setEntitylist(res);
        console.log(res);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },[1]);

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const AddEntityModal = () => {
    const [open, setOpen] = useState(false);
    const [formone, setFormone] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const HandleChangeFormOne = (event) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      setFormone({ ...formone, [name]: value });
    };

    const FormOneSubmit = () =>{
      set(ref(db, 'entity/' + auth.currentUser.uid + "/" + uuid), {
        companyName: formone.companyName,
        companyWebsite: formone.companyWebsite,
        companyDescription: formone.companyDescription
        // email: email
      });
    }

    const AddEntityModalboxstyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };



    return (
      <>
        <div>
          <div className="text-end m-sm-4">
            <Button
              onClick={handleOpen}
              variant="outlined"
              color="primary"
              className="mt-3 ml-auto"
            >
              <AddIcon /> Add New Entity
            </Button>
          </div>
          <Modal
            open={open}
            //onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            onClose={(_, reason) => {
              if (reason !== "backdropClick") {
                handleClose();
              }
            }}
          >
            <Box
              sx={AddEntityModalboxstyle}
              className="border-0 minh-16rem minw-36rem minw-sm-48rem"
            >
              <div className="container">
                <Typography id="modal-modal-title modelone-title" variant="h6" component="h2">
                  What are we pitching?
                  <p className="modelone-para">
                    This teaches our AI about your company
                  </p>
                  <Divider className="mb-3" />
                </Typography>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <FormControl className="mb-4" variant="standard" fullWidth>
                    <InputLabel shrink htmlFor="company-name">
                      Company Name
                    </InputLabel>
                    <BootstrapInput
                    type="text"
                      id="company-name"
                      className="w-100"
                      style={{ width: "100%" }}
                      name="companyName"
                      onChange={HandleChangeFormOne}
                      value={formone.companyName}
                    />
                  </FormControl>
                </Typography>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <FormControl className="mb-4" variant="standard" fullWidth>
                    <InputLabel shrink htmlFor="company-website">
                      Company Website
                    </InputLabel>
                    <BootstrapInput
                      id="company-website"
                      style={{ width: "100%" }}
                      name="companyWebsite"
                      onChange={HandleChangeFormOne}
                      value={formone.companyWebsite}
                    />
                  </FormControl>
                </Typography>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <FormControl className="mb-4" variant="standard" fullWidth>
                    <InputLabel shrink htmlFor="company-description">
                      Company Description
                    </InputLabel>
                    <BootstrapInput
                      id="company-description"
                      style={{ width: "100%" }}
                      name="companyDescription"
                      onChange={HandleChangeFormOne}
                      value={formone.companyDescription}
                    />
                  </FormControl>
                </Typography>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <Button variant="contained" className="btn-add-id w-80" onClick={FormOneSubmit}>
                    Add Identity
                  </Button>
                  <Button variant="contained" className="btn-add-id w-20" onClick={handleClose}>
                    Close
                  </Button>
                </Typography>
              </div>
            </Box>
          </Modal>
        </div>
      </>
    );
  };

  const Stepone = () => {
    const selectEntityDiv = (event) =>{
      console.log(event.getAttribute("colname"));
    }

    return (
      <>
        <div className="card border-0 minh-16rem">
          <List
            sx={{
              width: "90%",
              margin: "10px 20px",
            }}
          >
            {entitylist.map((label, index) => {
              return (
                <>
                  <div className="card mb-2">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="mx-1 mr-5"><img src={"https://s2.googleusercontent.com/s2/favicons?domain=www." + label.companyName} alt="profile"/></Avatar>
                      </ListItemAvatar>
                      <label onClick={selectEntityDiv} colname={label.companyName} style={{ textDecoration: "none" }}>
                        <ListItemText primary={label.companyName} secondary={label.companyDescription} />
                      </label>
                    </ListItem>
                  </div>
                  {/* <Divider component="li" variant="inset" /> */}
                </>
              );
            })}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MarkEmailReadOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <a href="" style={{ textDecoration: "none" }}>
                <ListItemText
                  primary="Personalizations only"
                  secondary="Write just the first line personalizations, I don't need the whole email written"
                />
              </a>
            </ListItem>
            <Divider component="li" variant="inset" />
            <AddEntityModal />
          </List>
        </div>
      </>
    );
  };

  const Steptwo = () => {
    return (
      <>
        <div className="card border-0 minh-16rem">
          <List
            sx={{
              width: "90%",
              margin: "10px 20px 30px 20px",
            }}
          >
            {Goals.map((label, index) => {
              return (
                <>
                  <div className="card mb-2">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="mx-1 mr-5">{label[1]}</Avatar>
                      </ListItemAvatar>
                      <a href="" style={{ textDecoration: "none" }}>
                        <ListItemText primary={label[2]} secondary={label[3]} />
                      </a>
                    </ListItem>
                  </div>
                  {/* <Divider component="li" variant="inset" /> */}
                </>
              );
            })}
          </List>
        </div>
      </>
    );
  };

  const Stepthree = () => {
    return (
      <>
        <div className="card border-0 minh-16rem stepthree">
          <List
            sx={{
              width: "90%",
              margin: "10px 20px 30px 20px",
            }}
          >
            <div className="mb-2 mt-4 text-center">
              <p>Enter your recipient's LinkedIn profile username</p>


              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              
          <OutlinedInput
            startAdornment={<InputAdornment position="end">linkedin.com/in/</InputAdornment>}
          />
          
        </FormControl>
        <Button variant="contained" className='my-2 py-3'>Write My Email</Button>
            </div>
          </List>
        </div>
      </>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              <Typography variant="caption">{captions[index]}</Typography>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Typography sx={{ mt: 2, mb: 1 }}> &nbsp; </Typography>
          {activeStep === 0 && <Stepone />}
          {activeStep === 1 && <Steptwo />}
          {activeStep === 2 && <Stepthree />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

function EmailWizard() {
  return (
    <>
      <Appbar />
      <WarningSection />
      <section id="newemailstep">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              <h4 className="font-bold">New Email Wizard</h4>
            </div>
            <div className="col-md-12 pb-5">
              <EmailStepsWizard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmailWizard;
