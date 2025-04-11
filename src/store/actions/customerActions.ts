import { AxiosError } from "axios";
import {
  CreateCustomer,
  Customer,
  UpdateCustomer,
} from "../../models/Customer";
import { GenericPagedResponse } from "../../models/GenericPagedResponse";
import {
  createGenericResponse,
  GenericResponse,
} from "../../models/GenericResponse";
import { PagingRequestModel } from "../../models/PagingRequestModel";
import {
  fetchCustomers as fetchCustomersFromApi,
  addCustomer as addCustomerToApi,
  deleteCustomer as deleteCustomerFromApi,
  updateCustomer as updateCustomerFromApi,
} from "../../services/customerService";
import {
  addCustomerFailure,
  addCustomerRequest,
  addCustomerSuccess,
  deleteCustomerFailure,
  deleteCustomerRequest,
  deleteCustomerSuccess,
  fetchCustomersFailure,
  fetchCustomersRequest,
  fetchCustomersSuccess,
  updateCustomerFailure,
  updateCustomerRequest,
  updateCustomerSuccess,
} from "../reducers/customerReducers";
import { AppDispatch } from "../store";
import { ValidationErrorDTO } from "../../models/ValidationErrorDTO";

export const fetchCustomers =
  (params: PagingRequestModel) => async (dispatch: AppDispatch) => {
    dispatch(fetchCustomersRequest());
    try {
      const response: GenericPagedResponse<Customer> =
        await fetchCustomersFromApi(params);
      dispatch(
        fetchCustomersSuccess(response as GenericPagedResponse<Customer>)
      ); // Başarılı ise verileri alırız
    } catch (error: any) {
      if (error.message?.status && error.message?.message) {
        // İlk hata formatı
        dispatch(
          fetchCustomersFailure(
            createGenericResponse(
              error.message.status,
              error.message.message,
              error.message.data
            )
          )
        );
      } else if (
        error.message?.error?.status &&
        error.message?.error?.response?.data?.message
      ) {
        // İkinci hata formatı
        dispatch(
          fetchCustomersFailure(
            createGenericResponse(
              error.message.error.status,
              error.message.error.response.data.message,
              error.message.error.response.data.data
            )
          )
        );
      } else {
        dispatch(
          fetchCustomersFailure(
            createGenericResponse(500, "Beklenmeyen bir hata oluştu!", "")
          )
        );
      }
    }
  };

export const addCustomer =
  (customer: CreateCustomer) => async (dispatch: AppDispatch) => {
    dispatch(addCustomerRequest());
    try {
      const newCustomer = await addCustomerToApi(customer);
      dispatch(addCustomerSuccess(newCustomer as GenericResponse<Customer>));
      return Promise.resolve(newCustomer);
    } catch (error: any) {
      const errorReponse = error.message.error as AxiosError<
        GenericResponse<ValidationErrorDTO>
      >;
      if (errorReponse.status === 400) {
        dispatch(
          addCustomerFailure(
            createGenericResponse<ValidationErrorDTO>(
              errorReponse.status,
              errorReponse.response?.data?.message || "",
              errorReponse.response?.data?.data as ValidationErrorDTO
            )
          )
        );
        return Promise.reject(errorReponse.response?.data?.data);
      } else {
        dispatch(
          addCustomerFailure(
            createGenericResponse(
              errorReponse.status || 500,
              errorReponse.response?.data?.message || "Bir hata oluştu",
              errorReponse.response?.data?.data as ValidationErrorDTO
            )
          )
        );
        return Promise.reject(errorReponse.response?.data?.message);
      }
    }
  };

export const deleteCustomer = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(deleteCustomerRequest());
  try {
    const respose = await deleteCustomerFromApi(id);
    dispatch(deleteCustomerSuccess(respose));
  } catch (error: any) {
    dispatch(
      deleteCustomerFailure(
        createGenericResponse(
          error.message.error.status,
          error.message.error.response.data.message,
          error.message.error.response.data.data
        )
      )
    );
  }
};

export const updateCustomer =
  (customer: UpdateCustomer) => async (dispatch: AppDispatch) => {
    dispatch(updateCustomerRequest());
    try {
      const updatedCustomer = await updateCustomerFromApi(customer);
      dispatch(
        updateCustomerSuccess(updatedCustomer as GenericResponse<Customer>)
      );
      return Promise.resolve(updatedCustomer);
    } catch (error: any) {
      const errorReponse = error.message.error as AxiosError<
        GenericResponse<ValidationErrorDTO>
      >;
      if (errorReponse.status === 400) {
        dispatch(
          updateCustomerFailure(
            createGenericResponse<ValidationErrorDTO>(
              errorReponse.status,
              errorReponse.response?.data?.message || "",
              errorReponse.response?.data?.data as ValidationErrorDTO
            )
          )
        );
        return Promise.reject(errorReponse.response?.data?.data);
      } else {
        dispatch(
          updateCustomerFailure(
            createGenericResponse<ValidationErrorDTO>(
              errorReponse.status || 500,
              errorReponse.response?.data?.message || "Bir hata oluştu",
              errorReponse.response?.data?.data as ValidationErrorDTO
            )
          )
        );
        return Promise.reject(
          errorReponse.response?.data?.message || "Bir hata oluştu"
        );
      }
    }
  };
