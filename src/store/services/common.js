import ApiConfig from "@/utils/api-config";
import ApiRequest from "@/utils/api-request";

export async function login(data) {
  return await ApiRequest.post(ApiConfig.API_INFO.login, data);
}

export async function sendActiveCode(data) {
  return await ApiRequest.post(ApiConfig.API_INFO.sendActiveCode, data);
}

export async function requestList(data) {
  return ApiRequest.get(
    ApiRequest.assemblePath(ApiConfig.API_INFO.requestList, null, data)
  );
}
