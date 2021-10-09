import { useState } from "react";

import "./styles.css";

const data = {
  1: [
    {
      id: 1,
      position: 0,
      children: [
        {
          // parent_id: 1,
          id: 2,
          label: "Achat",
          hasChildren: true
        },
        {
          // parent_id: 1,
          id: 3,
          label: "Location",
          hasChildren: true
        },
        {
          // parent_id: 1,
          id: 4,
          label: "Zero km",
          hasChildren: false
        }
      ]
    }
  ],
  2: [
    {
      parent_id: 2,
      position: 1,
      children: [
        {
          // parent_id: 1,
          id: 5,
          label: "Marque",
          hasChildren: true
        },
        {
          // parent_id: 1,
          id: 6,
          label: "Model",
          hasChildren: true
        }
      ]
    },
    {
      parent_id: 3,
      position: 1,
      children: [
        {
          // parent_id: 1,
          id: 7,
          label: "SALIM",
          hasChildren: false
        },
        {
          // parent_id: 1,
          id: 8,
          label: "Wassim",
          hasChildren: false
        }
      ]
    }
  ],
  3: [
    {
      parent_id: 5,
      position: 2,
      children: [
        {
          // parent_id: 1,
          id: 9,
          label: "Nissan",
          hasChildren: true
        },
        {
          // parent_id: 1,
          id: 10,
          label: "Renault",
          hasChildren: true
        }
      ]
    }
  ],
  4: []
};

const MenuContent = (props) => {
  return (
    <ul
      className={`hmenu level${Number(props.level) - 1} ${
        props.active ? "active" : ""
      } `}
      style={{ "--left": props.level - 1 }}
    >
      {props?.items?.map((item) => (
        <li>
          <button
            href=""
            className="hmenu-item"
            data-menu-id="2"
            data-ref-tag="nav_em_1_1_1_6"
            onClick={(e) =>
              item.hasChildren && props.openSubMenu(item.id, props.level - 1)
            }
          >
            <div>
              {item.label} {item.id}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
export default function App() {
  const [active, setActive] = useState([]);
  const handleClick = (id, index) => {
    const result = active.filter((_, i) => i < index);
    setActive([...result, id]);
  };
  const handleBack = () => {
    const newArr = active.slice(0, -1);
    setActive([...newArr]);
  };
  return (
    <div className="hmenu-container">
      <div className="hmenu-overlay"></div>
      <button onClick={handleBack}>handle back</button>
      <div className="hmenu-canvas">
        <div className="hmenu-content">
          {Object.keys(data).reduce((acc, level, index) => {
            data[level].forEach((element) => {
              acc.push(
                <MenuContent
                  items={element.children}
                  level={level}
                  active={
                    active.includes(element.parent_id) || Number(level) === 1
                  }
                  openSubMenu={handleClick}
                  handleBack={handleBack}
                />
              );
            });
            return acc;
          }, [])}
        </div>
      </div>
    </div>
  );
}
