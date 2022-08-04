import * as React from "react";
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
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

import Appbar from "./Appbar";
import "../../Assets/Styles/newemailstep.css";
import { WarningSection } from "./NewEmail";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
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

  const isStepOptional = (step) => {
    return step === 1;
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
          >
            <Box
              sx={AddEntityModalboxstyle}
              className="border-0 minh-16rem minw-36rem minw-sm-48rem"
            >
              <div className="container">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h3 className="modelone-title">What are we pitching?</h3>
                <p className="modelone-para">This teaches our AI about your company</p>
                <Divider className="mb-3" />
                </Typography>
                

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <FormControl className="mb-4" variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="company-name">
                    Company Name
                  </InputLabel>
                  <BootstrapInput id="company-name" className='w-100' style={{ width: "100%" }} />
                </FormControl>
              </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <FormControl className="mb-4" variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="company-website">
                    Company Website
                  </InputLabel>
                  <BootstrapInput id="company-website" style={{ width: "100%" }} />
                </FormControl>
              </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <FormControl className="mb-4" variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="company-description">
                    Company Description
                  </InputLabel>
                  <BootstrapInput id="company-description" style={{ width: "100%" }} />
                </FormControl>
              </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <Button variant="contained" className="btn-add-id w-100">Add Identity</Button>
              </Typography>


              </div>
            </Box>
          </Modal>
        </div>
      </>
    );
  };

  const Stepone = () => {
    return (
      <>
        <div className="card border-0 minh-16rem">
          <List
            sx={{
              width: "90%",
              margin: "10px 20px",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            <Divider component="li" variant="inset" />
            <AddEntityModal />
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
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && <Stepone />}
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
