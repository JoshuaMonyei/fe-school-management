import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const AccountProfile: React.FC = (props: any) => {
  const [user, setUser] = useState<any>([]);
  const [department, setDepartment] = useState<any>("");


  useEffect(() => {
    const asyncCallback = async () => {
      const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      const accessToken = window.sessionStorage.getItem("token") || "";
      const department = window.sessionStorage.getItem("department") || "";
      // const { data, error } = await updateUser(accessToken, department_id);
      // if (error) {
      //   setUser([]);
      // }
      setUser(user);
      setDepartment(department);
    };
    asyncCallback();
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.profile_pic}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.first_name + " " + user.last_name}
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {`Gender: ${user.gender}`}
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {`Department: ${department}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
