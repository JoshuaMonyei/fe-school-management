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

export const registerCourses = async (
  accessToken: string,
  body: any
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/register-course`,
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

export const getRegisteredCourses = async (
  accessToken: string,
  userId: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/get-courses/${userId}`,
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
  userId: string,
  body: any,
): Promise<ApiResponse> => {
  console.log("body", body)
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/update-profile`,
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

export const updateUserPicture = async (
  accessToken: string,
  userId: string,
  file: any
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/update-profile-picture`,
    method: "PUT",
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
    data: { file, user_id: userId },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const tuitionPayment = async (
  accessToken: string,
  amount: number
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/create-payment-intent`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: { amount },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};
