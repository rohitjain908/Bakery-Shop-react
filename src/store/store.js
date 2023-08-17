import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const initalState = {};

const store = configureStore({ reducer: reducer }, initalState);

export default store;
