import React, {useContext } from "react";
import { Helmet } from "react-helmet";
import { PayPalButton } from "react-paypal-button-v2";
import AppContext from "../context/AppContext";
import "../styles/components/Payment.css";
import {  useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const {state, addNewOrder} = useContext(AppContext);
    const { cart, buyer } = state;

    const paypalOptions = {
        clientID: "AVFY4wHvWUChXKd9WdmG0av7hoAQ8JTd_Q5DLD4y2SUvM4y6tZS96a9D6DeMAKze-r4s7rOrInibuoJX",
        intent: "capture",
        currency: "USD"
    }

    const buttonStyles = {
        Layout: "vertical",
        shape: "rect",
    }

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.attributes.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    };

    const handlePaymentSuccess = (data) => {
        console.log("sucessing");
        if(data.status === "COMPLETED"){
            const newOrder = {
                buyer,
                product: cart, 
                payment: data 
            }
            addNewOrder(newOrder);
            navigate("/checkout/success");
        }
    };
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: handleSumTotal()
              },
            },
          ],
        });
      };
      const onApprove = (data, actions) => {
        return actions.order.capture().then(function(data) {
        handlePaymentSuccess(data);
               });
      };
      
    return(
        <>
        <Helmet>
            <title>Platzi Conf Merch - Info de pago</title>
        </Helmet>
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del Pedido:</h3>
                {cart.map((item)=> (
                <div className="Payment-item" key="item.attributes.title">
                    <div className="Payment-element">
                        <h4>{item.attributes.title}</h4>
                        <span>$ {item.attributes.price}</span>
                    </div>
                </div>
                ))
                }
                <div className="Payment-item">
                        <h3>Total:</h3>
                        <span><strong>$ {handleSumTotal()}</strong></span>
                </div>
                <div className="Payment-button">
                    <PayPalButton
                    paypalOptions={paypalOptions}
                    buttonStyles={buttonStyles}
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                    onError={(error) => console.log(error)}
                    onCancel={data => console.log(data)}/>
                </div>
            </div>
        </div>
        </>
    );
};

export default Payment;