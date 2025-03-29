import { useCustomer } from "../CustomerContext"; // Import the context

function Menu() {
    const { menu } = useCustomer(); // Access the menu from the context

    return (
        <div className="page">
            <div className="menu__container">
                {Object.keys(menu).map((category) => (
                    <div className="menu__wrap" key={category}>
                        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                        {menu[category].map((item) => (
                            <div className="item" key={item.name}>
                                <span>{item.name}</span> <span>€{item.price}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
