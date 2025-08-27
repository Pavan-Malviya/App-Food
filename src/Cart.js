import React, { useState } from "react";

const Cart = ({ cartItems, onUpdateCart }) => {
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    setQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
  };

  const removeItem = (itemId) => {
    if (onUpdateCart) {
      onUpdateCart(cartItems.filter((_, index) => index !== itemId));
    }
    const newQuantities = { ...quantities };
    delete newQuantities[itemId];
    setQuantities(newQuantities);
  };

  const getItemQuantity = (itemId) => quantities[itemId] || 1;
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item, index) => {
      const quantity = getItemQuantity(index);
      const price = parseInt(item.costForTwoMessage?.replace(/[^0-9]/g, '') || '300');
      return total + (price * quantity);
    }, 0);
  };
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600">Your cart is empty</h3>
          <p className="text-gray-500">Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <svg className="w-7 h-7 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          Cart ({cartItems.length})
        </h3>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-4">
        {cartItems.map((item, index) => {
          const quantity = getItemQuantity(index);
          const price = parseInt(item.costForTwoMessage?.replace(/[^0-9]/g, '') || '300');
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.areaName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300">
                  <button 
                    onClick={() => updateQuantity(index, quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-3 py-1 font-medium">{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(index, quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-right min-w-[80px]">
                  <p className="font-semibold text-gray-900">₹{price * quantity}</p>
                  <p className="text-xs text-gray-500">₹{price} each</p>
                </div>
                
                <button 
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {cartItems.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-orange-500">₹{calculateTotal()}</span>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Proceed to Checkout</span>
            </button>
            <button 
              onClick={() => onUpdateCart && onUpdateCart([])}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
