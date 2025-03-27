function Menu() {
    return (
        <div className="page">
            <div className="menu__container">
                <div className="menu__wrap">
                    <h2>Mains</h2>
                    <div className="item"><span>Classic Cheese Burger</span> <span>€9.5</span></div>
                    <div className="item"><span>Cheeseburger</span> <span>€12</span></div>
                    <div className="item"><span>Smokey BBQ Burger</span> <span>€11</span></div>
                    <div className="item"><span>Veggie Burger</span> <span>€12</span></div>
                    <div className="item"><span>Double Stack Burger</span> <span>€15</span></div>
                </div>
                <div className="menu__wrap">
                    <h2>Sides</h2>
                    <div className="item"><span>French Fries</span> <span>€3</span></div>
                    <div className="item"><span>Oreo Cheesecake</span> <span>€5</span></div>
                    <div className="item"><span>Onion Rings</span> <span>€4.5</span></div>
                </div>
                <div className="menu__wrap">
                    <h2>Drinks</h2>
                    <div className="item"><span>Soda</span> <span>€2</span></div>
                    <div className="item"><span>Milkshakes</span> <span>€6</span></div>
                    <div className="item"><span>Iced Tea</span> <span>€2.50</span></div>
                </div>
                <div className="menu__wrap">
                    <h2>Specials</h2>
                    <div className="item"><span>Truffle Burger</span> <span>€17</span></div>
                    <div className="item"><span>Spicy Jalapeño Burger</span> <span>€13</span></div>
                </div>
            </div>
        </div>
    );
}

export default Menu;


