import HttpService from "./http-service";

class SaleService {
  constructor() {
    this.httpService = new HttpService();
  }

  async getSales(deleteFlag) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/sale`,
      {
        params: {
          deleteFlag: deleteFlag,
        },
      }
    );
  }

  async createSale(saleCreateDto) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/sale/create`,
      { body: saleCreateDto }
    );
  }

  async getSaleById(saleId) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/sale/${saleId}`
    );
  }

  async updateSaleById(saleId, saleUpdateDto) {
    return await this.httpService.request(
      "PUT",
      `${process.env.REACT_APP_API_URL}/api/v1/sale/update/${saleId}`,
      { body: saleUpdateDto }
    );
  }

  async deleteSaleById(saleId) {
    return await this.httpService.request(
      "DELETE",
      `${process.env.REACT_APP_API_URL}/api/v1/sale/delete/${saleId}`
    );
  }
}

export default SaleService;
