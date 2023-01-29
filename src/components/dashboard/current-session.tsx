import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const getCurrentSession = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return `${currentYear}/${nextYear}`;
};

export const CurrentSession: React.FC = (props: any) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Current Session
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {getCurrentSession()}
          </Typography>
          <Box
              sx={{
                alignItems: "center",
                display: "flex",
                // pt: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mr: 1,
                }}
              >
                Year:
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                Freshman
              </Typography>
            </Box>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SchoolIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
