import { ApiConfig } from "@/utils/api-config";
import ApiRequest from "@/utils/api-request";

export async function getTruckList(params) {
  const response = await ApiRequest.get(
    ApiRequest.assemblePath(ApiConfig.API_INFO.getTrucks, null, params)
  );

  return response;
}

export async function requestDriverList(params) {
  const response = await ApiRequest.get(
    ApiRequest.assemblePath(ApiConfig.API_INFO.getDriverOrders, null, params)
  );

  return response;
}
