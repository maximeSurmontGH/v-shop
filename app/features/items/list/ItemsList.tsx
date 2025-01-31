"use client";

import { useAppSelector } from "../../../lib/hooks";
import { selectItems } from "../items.slice";
import Item from "../Item";

const ItemsListComponent: React.FC<object> = () => {
  const items = useAppSelector(selectItems);

  return (
    <div>
      {items.map((item, index) => (
        <div className="mt-3" key={index}>
          <Item {...item} />
        </div>
      ))}
    </div>
  );
};

export default ItemsListComponent;
