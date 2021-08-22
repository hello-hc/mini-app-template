class ApiConfig {
  static get API_INFO() {
    return {
      login: {
        path: "/user/login",
      },
      sendActiveCode: {
        path: "/user/sendActiveCode",
      },
      getTrucks: {
        path: "/truck/list",
      },
      getTruckDetail: {
        path: "/truck/detail/:truckId",
      },
      createTruck: {
        path: "/truck/create",
      },
      editTruck: {
        path: "/truck/edit",
      },
      getWarehouses: {
        path: "/warehouse/list",
      },
      getTruckModeList: {
        path: "/truck/truck-mode/list",
      },
      getDriverOrders: {
        path: "/dock/appts",
      },
      requestOrderItem: {
        path: "/dock/appts/:id",
      },
      sendScanCode: {
        path: "/dock/appt/updateStatus",
      },
      uploadLocations: {
        path: "/dock/appts/reportLocation",
      },
      requestSignForList: {
        path: "/shipment/list",
      },
      getReasonRejectionList: {
        path: "/signFor/list/reasonrejection/:id",
      },
      sendReasonRejection: {
        path: "/signFor/send/reasonrejection",
      },
      getShipmentLines: {
        path: "/shipmentLine/list/:shipmentId",
      },
      findShipment: {
        path: "/shipment/find",
      },
      getRejectReasons: {
        path: "/shipment/rejectReasons",
      },
      getShipmentDetail: {
        path: "/shipment/detail/:shipmentId",
      },
      customerReview: {
        path: "/shipment/customerReview",
      },
      driverReview: {
        path: "/shipment/driverReview",
      },
      sign: {
        path: "/shipment/sign",
      },
      uploadFile: {
        path: "/file/upload",
      },
      getImages: {
        path: "/image/list",
      },
      getSignUrl: {
        path: "/shipment/getSignUrl",
      },
      getUnauthSsqUsers: {
        path: "/ssqUser/getUnAuth",
      },
      authorizeSsqUser: {
        path: "/ssqUser/authorize",
      },
    };
  }
}

export default ApiConfig;
