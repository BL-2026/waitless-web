import type { Strings } from "../translations/translations";
import type { MenuSection } from "../types";

interface Props {
  t: Strings;
  restaurantName: string;
  menu: MenuSection[];
  onBack: () => void;
}

export default function MenuScreen({ t, restaurantName, menu, onBack }: Props) {
  return (
    <div className="screen">
      <button className="back-link" onClick={onBack}>
        ← {t.back}
      </button>
      <h1 className="title">{restaurantName}</h1>
      <p className="subtitle">{t.menu}</p>

      <div className="menu-container">
        {menu.map((section) => (
          <div key={section.category} className="menu-section">
            <h2 className="category">{section.category}</h2>
            <div className="items-list">
              {section.items.map((item) => (
                <div key={item.name} className="item">
                  <div className="item-content">
                    <div className="item-name">{item.name}</div>
                    <div className="item-desc">{item.desc}</div>
                  </div>
                  <div className="item-price">${item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
