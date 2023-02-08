import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import { getRegisteredCourses } from "../../services/dashboardService";

export const RegisteredCourses: React.FC = (props, ...rest) => {
  const [courses, setCourses] = useState<string[]>([]);
  const [session, setSession] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const asyncCallback = async () => {
      const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      const accessToken = window.sessionStorage.getItem("token") || "";
      const registeredCourses = await getRegisteredCourses(
        accessToken,
        user.id
      );
      if (registeredCourses.data.course_registrations.length > 0) {
        setCourses(registeredCourses.data.course_registrations[0].courses);
        const { session_start_year, session_end_year } =
          registeredCourses.data.course_registrations[0];
        setSession(`${session_start_year}/${session_end_year}`);
      }
    };
    asyncCallback();
  }, []);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  if (courses.length > 0) {
    return (
      <Box {...rest}>
        <Card {...rest}>
          <CardHeader title="Registered Courses" />
          <Typography sx={{ m: 1 }} variant="subtitle2">
            Session: {session}
          </Typography>
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
  } else {
    return (
      <Box {...rest}>
        <Card {...rest}>
          <CardHeader title="Registered Courses" />
          <Typography sx={{ m: 1 }} variant="subtitle2">
            Session: {session}
          </Typography>
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
                  {/* show no data image if no data */}
                  <TableRow hover key={0}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body2" alignItems="center">
                          No data available
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
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
  }
};
