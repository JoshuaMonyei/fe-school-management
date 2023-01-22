import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const submitSignUpForm = async (
  accessToken: string,
  body: {
    profile: string;
    firstName: string;
    family_name?: string;
    given_name?: string;
    picture: string;
    lastName: string;
    email: string;
    sub: string;
    role: string;
    gender: string;
    departmentId: string;
    mobile: string;
    address: string;
  }
): Promise<ApiResponse> => {
  console.log("called signup service", accessToken, body);
  const {
    profile,
    firstName,
    given_name,
    family_name,
    picture,
    lastName,
    email,
    sub,
    role,
    gender,
    departmentId,
    mobile,
    address,
  } = body;
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/signup`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      id: profile,
      first_name: given_name ? given_name : firstName,
      last_name: family_name ? family_name : lastName,
      department_id: departmentId,
      email: email,
      auth0_user_id: sub,
      role: role,
      gender: gender,
      mobile: mobile,
      address: address,
      profile_pic: picture,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;
  console.log("data from signup service", data);

  return {
    data,
    error,
  };
};

const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};

export const getDepartmentCollection = () => [
  { id: "97953d27-5cab-4334-be35-9b1646b70887", title: "Visual Arts" },
  { id: "c3ba9927-d75f-48c2-b4c4-5488a85b51c8", title: "History" },
  { id: "afec38c8-ace1-497e-8b89-9dd48f764a02", title: "Computer Science" },
  { id: "af25d88f-09e0-406a-9887-440f9f01398e", title: "Economics" },
];

export function insertEmployee(data: any) {
  const employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null)
    localStorage.setItem(KEYS.employeeId, "0");
  let id = parseInt(localStorage.getItem(KEYS.employeeId) || "1");
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS?.employees) || "[]");
}
