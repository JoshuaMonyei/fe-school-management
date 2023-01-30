import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Checkbox,
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
}

export const CourseListResults: React.FC<CourseListProps> = ({
  courses,
  ...rest
}) => {
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event: any) => {
    let newSelectedCourseIds;

    if (event.target.checked) {
      newSelectedCourseIds = courses.map((course: any) => course.id);
    } else {
      newSelectedCourseIds = [];
    }

    setSelectedCourseIds(newSelectedCourseIds);
  };

  const handleSelectOne = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedIndex: any = selectedCourseIds?.indexOf(id);
    let newSelectedCourseIds: string[] = [];

    if (selectedIndex === -1) {
      newSelectedCourseIds = newSelectedCourseIds.concat(selectedCourseIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCourseIds = newSelectedCourseIds.concat(
        selectedCourseIds?.slice(1)
      );
    } else if (selectedIndex === selectedCourseIds?.length - 1) {
      newSelectedCourseIds = newSelectedCourseIds.concat(
        selectedCourseIds?.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCourseIds = newSelectedCourseIds.concat(
        selectedCourseIds?.slice(0, selectedIndex),
        selectedCourseIds?.slice(selectedIndex + 1)
      );
    }

    setSelectedCourseIds(newSelectedCourseIds);
  };

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
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCourseIds.length === courses.length}
                      color="primary"
                      indeterminate={
                        selectedCourseIds.length > 0 &&
                        selectedCourseIds.length < courses.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Credit Unit</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Course code</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.slice(0, limit).map((course: any) => (
                  <TableRow
                    hover
                    key={course.id}
                    selected={selectedCourseIds.indexOf(course.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCourseIds.indexOf(course.id) !== -1}
                        onChange={(event) => handleSelectOne(event, course.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {/* <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(customer.name)}
                      </Avatar> */}
                        <Typography color="textPrimary" variant="body1">
                          {course.subject_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{course.credit_unit}</TableCell>
                    <TableCell>{course.course_type}</TableCell>
                    <TableCell>{course.course_code}</TableCell>
                    {/* <TableCell>
                    {format(customer.createdAt, "dd/MM/yyyy")}
                  </TableCell> */}
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
      <Box
        sx={{
          float: "right",
          display: "flex-end",
          m: 4,
        }}
      >
        <Button color="primary" variant="contained">
          Submit Form
        </Button>
      </Box>
    </Box>
  );
};

CourseListResults.propTypes = {
  courses: PropTypes.array.isRequired,
};
