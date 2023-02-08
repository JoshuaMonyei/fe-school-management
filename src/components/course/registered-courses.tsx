import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

interface CourseListProps {
  courses: any;
  session: string;
}

export const CourseList: React.FC<CourseListProps> = ({
  courses,
  session,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  return (
    <Box {...rest}>
      <Typography sx={{ m: 1 }} variant="subtitle2">
        Session: {session}
      </Typography>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Credit Unit</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Course code</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.slice(0, limit).map((course: any) => (
                  <TableRow hover key={course.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {course.subject_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{course.credit_unit}</TableCell>
                    <TableCell>{course.course_type}</TableCell>
                    <TableCell>{course.course_code}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={courses.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </Box>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};
