import React from "react";
import { Box, Typography } from "@mui/material";

interface CourseProps {
  department: string;
}

export const PaymentToolbar: React.FC<CourseProps> = ({
  department,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Payment
          <Typography sx={{ m: 1 }} variant="subtitle2">
            Department: {department}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentToolbar;
