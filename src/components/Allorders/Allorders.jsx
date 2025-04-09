import React, { useContext, useEffect, useState } from "react";
import style from "./Allorders.module.css";
import { cartContext } from "../../Context/CartContext";
import { tokenContext } from "../../Context/TokenContext";
import { jwtDecode } from "jwt-decode";
import Loader from "../Shared/Loader/Loader";

export default function Allorders() {
  let { getUserOrder } = useContext(cartContext);
  let { token } = useContext(tokenContext);

  let [orders, setOrders] = useState([]);
  let [selectedOrder, setSelectedOrder] = useState(null);

  function getId() {
    let decoded = jwtDecode(token);
    console.log(decoded, "hello from JWTDECODED");
    getOrders(decoded.id);
  }

  async function getOrders(id) {
    let data = await getUserOrder(id);
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    token && getId();
  }, [token]);

  return (
    <>
      <div className='my-10 mt-20 p-5'>
        <div className="min-h-screen relative overflow-x-auto shadow-md sm:rounded-lg my-5">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">isPaid</th>
                <th scope="col" className="px-6 py-3">Payment Method</th>
                <th scope="col" className="px-6 py-3">Total Price</th>
                <th scope="col" className="px-6 py-3">View details</th>
              </tr>
            </thead>
            {orders.length !==0 ?(
              <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="odd:bg-white text-center even:bg-gray-50 border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">{order.id}</th>
                  <td className="px-6 py-4">{order.isPaid ? "Paid" : "Not Paid"}</td>
                  <td className="px-6 py-4">{order.paymentMethodType}</td>
                  <td className="px-6 py-4">${order.totalOrderPrice}</td>
                  <td className="px-6 py-4 flex justify-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <i className="fa fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            ):(
              <div className="flex items-center justify-center p-10">
                <p className="text-lg font-semibold text-gray-600">No orders found. Place an order!</p>
              </div>
            )}
            
          </table>
        </div>

        {/* MODAL - Scrollable Order Details with Table */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-bold mb-3">Order Details</h2>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Status:</strong> {selectedOrder.isPaid ? "Paid" : "Not Paid"}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethodType}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.totalOrderPrice}</p>

              {/* Products Table */}
              {selectedOrder.cartItems && selectedOrder.cartItems.length > 0 ? (
                <div className="mt-4 overflow-y-auto max-h-[50vh] border rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2">Qty</th>
                        <th className="px-4 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.cartItems.map((prod) => (
                        <tr key={prod.product.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <img src={prod.product.imageCover} alt={prod.product.title} className="w-12 h-12 object-cover rounded" />
                          </td>
                          <td className="px-4 py-2">{prod.product.title}</td>
                          <td className="px-4 py-2">{prod.count}</td>
                          <td className="px-4 py-2">${prod.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 mt-3">No products found.</p>
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
