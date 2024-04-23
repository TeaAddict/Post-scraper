import { Checkbox } from "@/components/ui/checkbox";
import { Post } from "@/utils/types/postTypes";
import { useUpdatePost } from "@/hooks/usePosts";

type Props = {
  cellVal: number;
  cellCol: string;
  rowData: Post;
};

const TableCheckBox = (props: Props) => {
  const updateMutation = useUpdatePost();
  const { cellVal, cellCol, rowData } = props;
  const { link } = rowData;
  const boolVal = cellVal === 1;

  function onClick() {
    updateMutation.mutate({ id: rowData.id, body: { [cellCol]: !boolVal } });
  }

  return (
    <div className="flex justify-center">
      <Checkbox
        id={link}
        className="w-6 h-6"
        checked={boolVal}
        onClick={onClick}
      />
    </div>
  );
};

export default TableCheckBox;
