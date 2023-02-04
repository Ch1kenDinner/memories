import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { mainReducer } from "./mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    // [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoreActions: true },
    })
		// .concat(mainApi.middleware),
});

export const useCustomSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useCustomDispatch: () => typeof store.dispatch = useDispatch;
