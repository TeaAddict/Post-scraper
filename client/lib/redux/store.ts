import postSlice from "@/features/post/postSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    post: postSlice,
  },
});
