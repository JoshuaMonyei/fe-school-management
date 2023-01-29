import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { getDepartmentDetails } from "../../services/dashboardService";

export const Department: React.FC = (props: any) => {
  const [departmentName, setDepartment] = useState("");
  useEffect(() => {
    const asyncCallback = async () => {
      const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      const departmentId = user.department_id;
      const token = window.sessionStorage.getItem("token") || "";
      const department = await getDepartmentDetails(departmentId, token);
      setDepartment(department.data.department_name);
    };

    asyncCallback();
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Department
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {departmentName}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            alignItems: "center",
            display: "flex",
            // pt: 1,
          }}
        >
          <ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          >
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Year One
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};
