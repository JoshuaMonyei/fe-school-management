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
  console.log("called signup service", accessToken, body);
  const { profile: id } = body;
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/get-user/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;
  console.log("data from user details service", data);

  return {
    data,
    error,
  };
};
