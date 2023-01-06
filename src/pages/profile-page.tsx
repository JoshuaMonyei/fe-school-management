// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";
// import { CodeSnippet } from "../components/code-snippet";
// import { PageLayout } from "../components/page-layout";

// export const ProfilePage: React.FC = () => {
//   const { user } = useAuth0();

//   if (!user) {
//     return null;
//   }

//   // return (
//   //   <PageLayout>
//   //     <div className="content-layout">
//   //       <h1 id="page-title" className="content__title">
//   //         Profile Page
//   //       </h1>
//   //       <div className="content__body">
//   //         <p id="page-description">
//   //           <span>
//   //             You can use the <strong>ID Token</strong> to get the profile
//   //             information of an authenticated user.
//   //           </span>
//   //           <span>
//   //             <strong>Only authenticated users can access this page.</strong>
//   //           </span>
//   //         </p>
//   //         <div className="profile-grid">
//   //           <div className="profile__header">
//   //             <img
//   //               src={user.picture}
//   //               alt="Profile"
//   //               className="profile__avatar"
//   //             />
//   //             <div className="profile__headline">
//   //               <h2 className="profile__title">{user.name}</h2>
//   //               <span className="profile__description">{user.email}</span>
//   //             </div>
//   //           </div>
//   //           <div className="profile__details">
//   //             <CodeSnippet
//   //               title="Decoded ID Token"
//   //               code={JSON.stringify(user, null, 2)}
//   //             />
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </PageLayout>
//   // );
// };


import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "src/components/page-layout";
import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

const mdTheme = createTheme();

export const ProfilePage: React.FC = () => {
  const [value, setValue] = React.useState<string>('student');
  const [address, setAddress] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('');
  const [department, setDepartment] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(event.target.value);
  };

  return (
    <PageLayout>
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
    <form>
      <FormControl component="fieldset">
        <FormLabel  component="legend">Role</FormLabel>
        <RadioGroup aria-label="role" name="role" row value={value} onChange={handleChange}>
          <FormControlLabel value="student" control={<Radio />} label="Student" />
          <FormControlLabel value="staff" control={<Radio />} label="Staff" />
        </RadioGroup>
      </FormControl>
      <br />
      <TextField
        label="Address"
        value={address}
        onChange={handleAddressChange}
        variant="outlined"
        fullWidth
      />
      <br />
      <TextField
        label="Gender"
        value={gender}
        onChange={handleGenderChange}
        variant="outlined"
        fullWidth
      />
      <br />
      <TextField
        label="Department"
        value={department}
        onChange={handleDepartmentChange}
        variant="outlined"
        fullWidth
      />
    </form>
    </Box>
    </ThemeProvider>
    </PageLayout>
  );
};
