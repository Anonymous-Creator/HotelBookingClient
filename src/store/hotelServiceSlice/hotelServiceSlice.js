import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import HotelServiceService from "../../services/hotel-service.service";

// import { userAPI } from "./userAPI";

const hotelService = new HotelServiceService();

export const fetchGetHotelServicesAdmin = createAsyncThunk(
  "/hotels",
  async (deleteFlag, thunkAPI) => {
    try {
      const response = await hotelService.getServicesAdmin(deleteFlag);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }
);

export const fetchGetHotelServices = createAsyncThunk(
  "/hotels",
  async (thunkAPI) => {
    try {
      const response = await hotelService.getServices();
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }
);

export const fetchGetHotelService = createAsyncThunk(
  "/hotels",
  async (serviceId, thunkAPI) => {
    try {
      const response = await hotelService.getServiceById(serviceId);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }
);

export const fetchUpdateHotelService = createAsyncThunk(
  "/hotels",
  async ({ serviceId, updateServiceDto }, thunkAPI) => {
    try {
      const response = await hotelService.updateServiceById(
        serviceId,
        updateServiceDto
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }
);

export const fetchCreateHotelServices = createAsyncThunk(
  "/hotels",
  async (serviceCreateDto, thunkAPI) => {
    try {
      const response = await hotelService.createService(serviceCreateDto);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }
);

export const fetchDeleteHotelService = createAsyncThunk(
  "sale",
  async (saleId, thunkAPI) => {
    const response = await hotelService.deleteServiceById(saleId);
    return response.data;
  }
);

const initialState = {
  entities: [],
  loading: "idle",
};

// Then, handle actions in your reducers:
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchLogin.fulfilled, (state, action) => {
  //       state.entities.push(action.payload);
  //     });
  //   },
});

export default hotelSlice.reducer;
