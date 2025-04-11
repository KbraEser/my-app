import { Customer } from "../models/Customer";
import { GenericPagedResponse } from "../models/GenericPagedResponse";
import { PagingRequestModel } from "../models/PagingRequestModel";
import { fetchCustomersRequest } from "../store/reducers/customerReducers";
import { AppDispatch } from "../store/store";

export const fetchCustomers =
  (params: PagingRequestModel) => async (dispatch: AppDispatch) => {
    dispatch(fetchCustomersRequest());
    try {
      const response: GenericPagedResponse<Customer> =
        await fetchCustomersFromApi(params);
    } catch {}
  };
