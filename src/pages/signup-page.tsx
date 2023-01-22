import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "src/components/page-layout";
import Controls from "../components/formControl/index";
import { useForm, Form } from "../components/useForm";
import * as signUpService from "../services/signUpService";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { Paper, Card, Typography, makeStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: theme.spacing(3),
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
  pageContent: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const roleItems = [
  { id: "1", title: "Student" },
  { id: "2", title: "Staff" },
];

const initialFValues = {
  id: 0,
  firstName: "",
  lastName: "",
  mobile: "",
  address: "",
  role: "student",
  gender: "",
  departmentId: "",
  hireDate: new Date().toISOString().slice(0, 10),
};

export const SignUpForm: React.FC = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }
  const classes = useStyles();
  const validate: any = (fieldValues = values) => {
    const temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("address" in fieldValues)
      temp.address =
        fieldValues.address.length > 9 ? "" : "This field is required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validate()) {
      // make api request with signUp service submitForm function
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await signUpService.submitSignUpForm(
        accessToken,
        { ...values, ...user }
      );
      if (!error) {
        console.log("data", data);
        resetForm();
        // navigate to dashboard page
        toast.success("Successfully completed registration");
        history.push("/dashboard");
      } else {
        console.log("error", error);
        toast.error("Something went wrong, please try again");
      }
    }
  };

  // useEffect(() => {
  //   console.log("values", values);
  // }, [values.hireDate]);

  const icon = <PeopleOutlineTwoToneIcon fontSize="large" />;
  const title = "Sign Up Form";
  const subTitle = "Complete your registration";

  return (
    <PageLayout>
      <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
          <Card className={classes.pageIcon}>{icon}</Card>
          <div className={classes.pageTitle}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle2" component="div">
              {subTitle}
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper className={classes.pageContent}>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="firstName"
                label="First Name"
                value={user.given_name ? user.given_name : values.fullName}
                onChange={handleInputChange}
                error={errors.firstName}
              />
              <Controls.Input
                name="lastName"
                label="Last Name"
                value={user.family_name ? user.family_name : values.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
              />
              <Controls.Input label="Email" name="email" value={user.email} />
              <Controls.Input
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
              />
              <Controls.Input
                label="Address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.RadioGroup
                name="role"
                label="Role"
                value={values.role}
                onChange={handleInputChange}
                items={roleItems}
              />
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={values.gender}
                onChange={handleInputChange}
                items={genderItems}
              />
              <Controls.Select
                name="departmentId"
                label="Department"
                value={values.departmentId}
                onChange={handleInputChange}
                options={signUpService.getDepartmentCollection()}
                error={errors.departmentId}
              />
              <Controls.DatePicker
                name="hireDate"
                label="Hire Date"
                value={values.hireDate}
                onChange={handleInputChange}
              />
              <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  onClick={handleSubmit}
                />
                {/* <Controls.Button text="Reset" color="default" onClick={resetForm} /> */}
              </div>
            </Grid>
          </Grid>
        </Form>
      </Paper>
      <ToastContainer />
    </PageLayout>
  );
};
