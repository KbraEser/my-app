import { CreateCustomer, Customer, UpdateCustomer } from "../models/Customer";
import {
  GenericPagedResponse,
  mapApiResponseToPagedResponse,
} from "../models/GenericPagedResponse";
import { PagingRequestModel } from "../models/PagingRequestModel";
import { api } from "../lib/interceptor";
import { AxiosError } from "axios";
import {
  createGenericResponse,
  GenericResponse,
} from "../models/GenericResponse";
import { ValidationErrorDTO } from "../models/ValidationErrorDTO";

export const fetchCustomers = async (
  params: PagingRequestModel
): Promise<GenericPagedResponse<Customer>> => {
  try {
    const response = await api.get("/Customer", { params });
    return mapApiResponseToPagedResponse<Customer>(response.data);
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const addCustomer = async (
  customer: CreateCustomer
): Promise<
  | GenericResponse<Customer>
  | GenericResponse<ValidationErrorDTO>
  | GenericResponse<string>
> => {
  try {
    const response = await api.post("/Customer", customer);
    return createGenericResponse(
      response.status,
      response.data.message,
      response.data.data
    );
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const deleteCustomer = async (
  id: number
): Promise<GenericResponse<string>> => {
  try {
    const response = await api.delete(`/Customer/${id}`);
    return createGenericResponse(
      response.status,
      response.statusText,
      response.data.data
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateCustomer = async (
  customer: UpdateCustomer
): Promise<
  | GenericResponse<Customer>
  | GenericResponse<ValidationErrorDTO>
  | GenericResponse<string>
> => {
  try {
    const response = await api.put(`/Customer/${customer.Id}`, customer);
    return createGenericResponse(
      response.status,
      response.data.message,
      response.data.data
    );
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const downloadCustomers = async (format: string) => {
  try {
    const response = await api.post(
      `/Customer/DownloadCustomers`,
      {},
      {
        headers: {
          Accept: format,
        },
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const uploadCustomerFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/Customer/UploadCustomers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
