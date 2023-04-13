import HttpService from "./http-service";

class HotelServiceService {
  constructor() {
    this.httpService = new HttpService();
  }

  async getServicesAdmin(deleteFlag) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/service/admin`,
      {
        params: {
          deleteFlag: deleteFlag,
        },
      }
    );
  }

  async getServices() {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/service`
    );
  }

  async createService(serviceCreateDto) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/service/create`,
      { body: serviceCreateDto },
      false
    );
  }

  async getServiceById(serviceId) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/service/${serviceId}`
    );
  }

  async updateServiceById(serviceId, updateServiceDto) {
    return await this.httpService.request(
      "PUT",
      `${process.env.REACT_APP_API_URL}/api/v1/service/update/${serviceId}`,
      { body: updateServiceDto },
      false
    );
  }

  async deleteServiceById(serviceId) {
    return await this.httpService.request(
      "DELETE",
      `${process.env.REACT_APP_API_URL}/api/v1/service/delete/${serviceId}`
    );
  }
}

export default HotelServiceService;
