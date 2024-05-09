import {
  deletePost,
  getNewPosts,
  getPosts,
  updatePost,
} from "@/features/post/postActions";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

export const useGetNewPosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getNewPosts,
    onError: (e) => {
      console.log(e.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
