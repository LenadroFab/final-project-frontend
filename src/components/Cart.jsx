export default function Cart({ cart, setCart }) {

  const checkout = async () => {
    const user = localStorage.getItem("username") || "kasir";
    const body = {
      user_id: user,
      items: cart.map(c => ({
        menu_id: c.id,
        qty: c.qty,
        price: c.price
      }))
    };

    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });

    const data = await res.json();
    alert("Order berhasil disimpan! Order ID: " + data.order_id);
    setCart([]);
  };

  const total = cart.reduce((sum, x) => sum + x.subtotal, 0);

  return (
    <div className="card p-3 mt-4">
      <h5>Cart</h5>
      <table className="table">
        <tbody>
          {cart.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.qty}</td>
              <td>Rp {c.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Total: Rp {total}</h5>
      <button className="btn btn-primary" onClick={checkout} disabled={cart.length === 0}>Checkout</button>
    </div>
  );
}
