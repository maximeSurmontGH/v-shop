"use client";

import { useAppSelector } from "../../../lib/hooks";
import { selectItems } from "../items.slice";
import ItemRow from "../ItemRow";

const ItemRows: React.FC<object> = () => {
  const items = useAppSelector(selectItems);

  return (
    <div>
      {items.map((item, index) => (
        <div className="mt-2" key={index}>
          <ItemRow {...item} />
        </div>
      ))}
    </div>
  );
};

export default ItemRows;
