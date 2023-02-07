import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { updateUserPicture } from "../../services/dashboardService";
import { toast } from "react-toastify";

export const AccountProfile: React.FC = (props: any) => {
  const { user } = useSelector((state: any) => state.user);
  const [token, setToken] = useState<any>("");
  const [department, setDepartment] = useState<any>("");
  const [picture, setPicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );
  const dispatch = useDispatch();
  const updateUser = (user: any) => dispatch({ type: "UPDATE_USER", user });

  useEffect(() => {
    const asyncCallback = async () => {
      const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      const accessToken = window.sessionStorage.getItem("token") || "";
      const department = window.sessionStorage.getItem("department") || "";
      // setUser(user);
      setToken(accessToken);
      setDepartment(department);
      setPicture(user.profile_pic);
    };
    asyncCallback();
  }, []);

  const handlePictureChange = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const { data, error } = await updateUserPicture(token, user.id, file);
    if (!error) {
      window.sessionStorage.setItem("user", JSON.stringify(data));
      // window.location.reload();
      if (data.profile_pic) {
        updateUser(data);
        setPicture(data.profile_pic);
        toast.success("Profile picture updated successfully");
      }
    } else {
      toast.error("Error updating profile picture");
    }
  };

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
            src={picture}
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
        <div style={{ textAlign: "center", margin: "auto" }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handlePictureChange}
          />
          <label htmlFor="raised-button-file">
            <Button color="primary" fullWidth variant="text" component="span">
              Upload picture
            </Button>
          </label>
        </div>
      </CardActions>
    </Card>
  );
};
