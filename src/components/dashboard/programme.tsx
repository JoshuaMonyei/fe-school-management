import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

export const Programme: React.FC = (props: any) => {
  const [studentId, setStudentId] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const asyncCallback = async () => {
      const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      setStudentId(user.id.slice(0, 8));
      setRole(user.role);
    };

    asyncCallback();
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Programme
            </Typography>
            <Typography color="textPrimary" variant="h4">
              Undergraduate
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                // pt: 1,
              }}
            >
              <BadgeIcon color="success" />
              <Typography
                variant="body2"
                sx={{
                  mr: 1,
                }}
              >
                {role == "1" ? "Student ID:" : role == "2" ? "Staff ID:" : "Admin ID:"}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                {studentId}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
