import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getUserDetails = async (
  accessToken: string,
  body: {
    profile?: string;
  }
): Promise<ApiResponse> => {
  const { profile: id } = body;
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/get-user/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const getDepartmentDetails = async (
  id: string,
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/get-department/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const getCourses = async (
  accessToken: string,
  departmentId: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/get-subjects/${departmentId}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};


export const updateUser = async (
  accessToken: string,
  user_id: string,
  body: {
    first_name: string;
    last_name: string;
    phone_number: string;
    campus: string;
    address: string;
  },
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/get-user/${user_id}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};