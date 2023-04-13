import HttpService from "./http-service";

class UserService {
  constructor() {
    this.httpService = new HttpService();
  }

  async getCurrentUser() {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/user/current`
    );
  }

  async getUsers(deleteFlag) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/user`,
      {
        params: {
          isLocked: deleteFlag,
        },
      }
    );
  }

  async getUserById(userId) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/user/${userId}`
    );
  }

  async updateUserById(userId, updateUserDto) {
    console.log(userId, updateUserDto);
    return await this.httpService.request(
      "PATCH",
      `${process.env.REACT_APP_API_URL}/api/v1/user/update/${userId}`,
      { body: updateUserDto },
      false
    );
  }

  async deleteUserById(userId) {
    return await this.httpService.request(
      "DELETE",
      `${process.env.REACT_APP_API_URL}/api/v1/user/delete/${userId}`
    );
  }

  async register(authCredential) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/auth/signup`,
      { body: authCredential }
    );
  }
}

export default UserService;
