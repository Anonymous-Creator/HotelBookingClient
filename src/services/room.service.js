import HttpService from "./http-service";

class RoomService {
  constructor() {
    this.httpService = new HttpService();
  }

  async getAvailableRooms(expectedCheckIn, expectedCheckOut, num, type) {
    console.log(expectedCheckIn, expectedCheckOut, num, type);
    let params = {};
    if (expectedCheckIn) params["checkin"] = expectedCheckIn;
    if (expectedCheckOut) params["checkout"] = expectedCheckOut;
    if (num) params["capacity"] = num;
    if (type) params["roomType"] = type;
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/room/available`,
      {
        params: params,
      }
      // ?checkin=${expectedCheckIn}&checkout=${expectedCheckOut}&roomType=${type}&maxNum=${num}
    );
  }

  async getRooms(deleteFlag) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/room`,
      {
        params: {
          deleteFlag: deleteFlag,
        },
      }
    );
  }

  async createRoom(roomCreateDTO) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/room/create`,
      { body: roomCreateDTO },
      false
    );
  }

  async getRoomById(roomId) {
    return await this.httpService.request(
      "GET",
      // `${process.env.REACT_APP_API_URL}/api/v1/room/${roomId}/room-ratings`
      `${process.env.REACT_APP_API_URL}/api/v1/room/${roomId}`
    );
  }

  async getRatingByRoomId(roomId) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/room/${roomId}/room-ratings`
    );
  }

  async updateRoomById(roomId, updateRoomDto) {
    return await this.httpService.request(
      "PUT",
      `${process.env.REACT_APP_API_URL}/api/v1/room/update/${roomId}`,
      { body: updateRoomDto },
      false
    );
  }

  async deleteRoomById(roomId) {
    return await this.httpService.request(
      "DELETE",
      `${process.env.REACT_APP_API_URL}/api/v1/room/delete/${roomId}`
    );
  }

  async createRoomRating(createRoomRatingDto, roomId) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/room-rating/create/${roomId}`,
      { body: createRoomRatingDto }
    );
  }
}

export default RoomService;
