import { getNewPosts, getPosts } from "@/features/post/getPosts";
import { updatePost } from "@/features/post/updatePost";
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
    onSuccess: (data) => {
      console.log(data);
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
