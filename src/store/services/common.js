import ApiConfig from "@/utils/api-config";
import ApiRequest from "@/utils/api-request";

export async function login(data) {
  return await ApiRequest.post(ApiConfig.API_INFO.login, data);
}

export async function sendActiveCode(data) {
  return await ApiRequest.post(ApiConfig.API_INFO.sendActiveCode, data);
}

export async function getList(params) {
  const response = await ApiRequest.get(
    ApiRequest.assemblePath(ApiConfig.API_INFO.getList, null, params)
  );

  return response;
}

export async function requestDriverList(params) {
  const response = await ApiRequest.get(
    ApiRequest.assemblePath(ApiConfig.API_INFO.getDriverOrders, null, params)
  );

  return response;
}
