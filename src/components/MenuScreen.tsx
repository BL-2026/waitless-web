import { useState } from "react";
import type { Strings } from "../translations/translations";
import type { MenuSection } from "../types";

interface Props {
  t: Strings;
  restaurantName: string;
  menu: MenuSection[];
  onBack: () => void;
}

export default function MenuScreen({ t, restaurantName, menu, onBack }: Props) {
  const [active, setActive] = useState(menu[0]?.category ?? "");

  return (
    <div className="screen menu-screen">
      <button className="text-button" onClick={onBack}>
        {t.back}
      </button>
      <header className="menu-hero">
        <p className="eyebrow">{t.menu}</p>
        <h1 className="restaurant-title">{restaurantName}</h1>
      </header>

      <div className="category-tabs" role="tablist">
        {menu.map((section) => (
          <button
            key={section.category}
            className={`category-tab ${active === section.category ? "is-active" : ""}`}
            onClick={() => {
              setActive(section.category);
              document.getElementById(`section-${section.category}`)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {section.category}
          </button>
        ))}
      </div>

      <div className="menu-container">
        {menu.map((section) => (
          <section key={section.category} id={`section-${section.category}`} className="menu-section">
            <h2 className="category">{section.category}</h2>
            <div className="items-list">
              {section.items.map((item) => (
                <article key={item.name} className="item">
                  <div className="item-content">
                    <div className="item-name">{item.name}</div>
                    <div className="item-desc">{item.desc}</div>
                  </div>
                  <div className="item-price">
                    {item.price} {t.currency}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
