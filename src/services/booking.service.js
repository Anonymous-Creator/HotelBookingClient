import HttpService from "./http-service";

class BookingService {
  constructor() {
    this.httpService = new HttpService();
  }

  async getBookingsAdmin() {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/booking/admin`
    );
  }

  async getBookings() {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/booking`
    );
  }

  async getBookingsUser() {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/booking/user`
    );
  }

  async createBooking(bookingCreateDTO) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/booking/create`,
      { body: bookingCreateDTO }
    );
  }

  async getBookingById(bookingId) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/booking/${bookingId}`
    );
  }

  async updateBookingById(bookingUpdateDto, bookingId) {
    return await this.httpService.request(
      "PUT",
      `${process.env.REACT_APP_API_URL}/api/v1/booking/update/${bookingId}`,
      { body: bookingUpdateDto }
    );
  }

  async deleteBookingById(bookingId) {
    return await this.httpService.request(
      "DELETE",
      `${process.env.REACT_APP_API_URL}/api/v1/booking/delete/${bookingId}`
    );
  }
}

export default BookingService;
