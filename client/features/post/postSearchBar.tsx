import SearchBox from "@/components/shared/SearchBox";
import Button from "../../components/shared/Button";
import { ChangeEventHandler } from "react";
import { useGetNewPosts } from "@/hooks/usePosts";
import Loader from "@/components/shared/loader/Loader";

function PostSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const getNewPosts = useGetNewPosts();

  function onClick() {
    getNewPosts.mutate({ keyword: value });
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
    </div>
  );
}

export default PostSearchBar;
