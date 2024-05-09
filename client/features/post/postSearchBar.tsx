import SearchBox from "@/components/shared/SearchBox";
import Button from "../../components/shared/Button";
import { ChangeEventHandler, useState } from "react";
import { useGetNewPosts } from "@/hooks/usePosts";
import Loader from "@/components/shared/loader/Loader";

function PostSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [maxPosts, setMaxPosts] = useState(0);
  const getNewPosts = useGetNewPosts();

  function onClick() {
    getNewPosts.mutate(
      { keyword: value },
      {
        onSuccess: (data) => {
          console.log("MUTATION SUCCESS:", data);
          if (data) setMaxPosts(data.maxPosts);
        },
      }
    );
  }

  return (
    <div className="flex gap-4">
      <SearchBox value={value} onChange={onChange} />
      <div>
        <Button
          variation="primary"
          onClick={onClick}
          disabled={getNewPosts.isPending}
        >
          {getNewPosts.isPending ? <Loader size={6} /> : "Get data"}
        </Button>
      </div>
      {maxPosts > 0 && (
        <p className="flex items-center">Max available posts: {maxPosts}</p>
      )}
    </div>
  );
}

export default PostSearchBar;
