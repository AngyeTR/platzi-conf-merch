import React, { useRef, useContext } from "react";
import { Helmet } from "react-helmet";
import "../styles/components/Information.css";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Information = () => {
    const {state, addToBuyer} = useContext(AppContext);
    const form = useRef(null);
    const navigate = useNavigate();
    const {cart} = state;

    const handleSubmit = () => {
        const formData = new FormData(form.current);
        const buyer= {
            "name": formData.get("name"),
            "email": formData.get("email"),
            "address": formData.get("address"),
            "apto": formData.get("apto"),
            "city": formData.get("city"),
            "state": formData.get("state"),
            "country": formData.get("country"),
            "zipcode": formData.get("zipcode"),
            "phone": formData.get("phone")
        };

        addToBuyer(buyer);
        navigate("/checkout/payment");
    };   

    return(
        <>
        <Helmet>
            <title>Platzi Conf Merch - Comprador</title>
        </Helmet>
        <div className="Information">
            <div className="Information-content">
                <div className="Information-head">
                    <h2>Contact Information</h2>
                </div>
                <div className="Information-form">
                    <form ref={form}>
                        <input type="text" placeholder="Nombre Completo" name="name" />
                        <input type="text" placeholder="Correo Electrónico" name="email"/>
                        <input type="text" placeholder="Dirección" name="address"/>
                        <input type="text" placeholder="Complemento" name="apto"/>
                        <input type="text" placeholder="Ciudad" name="city"/>
                        <input type="text" placeholder="Estado" name="state"/>
                        <input type="text" placeholder="País" name="country"/>
                        <input type="text" placeholder="Código Postal" name="zipcode"/>
                        <input type="text" placeholder="Teléfono" name="phone"/>
                    </form>
                </div>
                <div className="Information-buttons">
                    <div className="Information-back">
                    <Link to="/checkout">
                        <button type="button" >Regresar</button>
                    </Link>
                    </div>
                    <div className="Information-next">
                    <Link to="/checkout/payment">
                        <button type="button" onClick={handleSubmit}>Pagar</button>
                        
                    </Link>
                    </div>
                </div>
                <div className="Information-sidebar">
                    <h3>Pedido:</h3>
                    {cart.map((item)=> (
                        <div className="Information-item" key={item.title}>
                        <div className="Information-element">
                            <h4>{item.title}</h4>
                            <span>{`$ ${item.price}`}</span>
                        </div>
                    </div>
                    ))}
                    
                </div>
            </div>
        </div>
    </>
);
                    }

export default Information;