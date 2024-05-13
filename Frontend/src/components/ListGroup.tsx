//import { MouseEvent } from "react";

import { useState } from "react";

// { items: [], heading: string }
interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  //let selectedIndex = 0; First Item is Selected
  //let selectedIndex = -1; No Item is Selected

  //HOOK
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //arr[0] variable (selectedItem)
  //arr[1] updater function

  //EventHandler
  //const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No Items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? `list-group-item active`
                : `list-group-item`
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
