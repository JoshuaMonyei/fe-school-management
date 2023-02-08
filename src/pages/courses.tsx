import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@mui/material";
import { CourseListResults } from "../components/course/course-list-results";
import { CourseListToolbar } from "../components/course/course-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { CourseList } from "../components/course/registered-courses";
import { getRegisteredCourses, getCourses } from "../services/dashboardService";

const Page: React.FC = () => {
  const [courses, setCourses] = useState<any>([]);
  const [department, setDepartment] = useState<any>("");
  const [registered, setRegistered] = useState(false);
  const [session, setSession] = useState("");

  useEffect(() => {
    const asyncCallback = async () => {
      const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      const accessToken = window.sessionStorage.getItem("token") || "";
      const department = window.sessionStorage.getItem("department") || "";
      const department_id = user.department_id;
      const registeredCourses = await getRegisteredCourses(
        accessToken,
        user.id
      );
      if (registeredCourses.data.course_registrations.length > 0) {
        console.log("registeredCourses", registeredCourses.data);
        setRegistered(true);
        setCourses(registeredCourses.data.course_registrations[0].courses);
        const { session_start_year, session_end_year } =
          registeredCourses.data.course_registrations[0];
        setSession(`${session_start_year}/${session_end_year}`);
      } else {
        const { data, error } = await getCourses(accessToken, department_id);
        if (error) {
          setCourses([]);
        }
        setCourses(data.subjects);
      }
      setDepartment(department);
    };
    asyncCallback();
  }, []);

  return (
    <>
      <DashboardLayout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Courses</title>
        </Helmet>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CourseListToolbar department={department} />
            <Box sx={{ mt: 3 }}>
              {registered && <CourseList courses={courses} session={session} />}
              {!registered && <CourseListResults courses={courses} />}
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Page;
