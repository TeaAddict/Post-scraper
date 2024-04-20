import SearchBox from "../../components/shared/searchBox";
import Button from "../../components/shared/button";
import { ChangeEventHandler } from "react";

function PostSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex gap-4">
      <SearchBox value={value} onChange={onChange} />
      <div>
        <Button variation="primary">Get data</Button>
      </div>
    </div>
  );
}

export default PostSearchBar;
