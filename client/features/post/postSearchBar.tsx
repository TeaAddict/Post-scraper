import SearchBox from "../../components/shared/searchBox";
import Button from "../../components/shared/button";
import { ChangeEventHandler } from "react";
import { useGetNewPosts } from "@/hooks/usePosts";

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
        <Button variation="primary" onClick={onClick}>
          Get data
        </Button>
      </div>
    </div>
  );
}

export default PostSearchBar;
