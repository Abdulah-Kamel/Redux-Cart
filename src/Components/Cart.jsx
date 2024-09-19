import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from "../RTK/Slices/CartSlice";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Loading from "./Loading";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const totalPrice = state.reduce((acc, product) => {
    return (acc += product.price * product.quantity);
  }, 0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <Container className="mt-5">
      {loading ? (
        <Loading size={"large"} />
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.map((product, id) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{product.title}</td>
                    <td className="text-center">
                      <Image
                        src={product.image}
                        style={{ width: "100px", height: "100px" }}
                        alt={product.title}
                      />
                    </td>
                    <td className="text-center fw-bold">{product.quantity}</td>
                    <td className="text-center text-success fw-bold">
                      {product.price}$
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          dispatch(deleteFromCart(state.indexOf(product)));
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <section className="d-flex justify-content-between align-items-center text-danger">
            <section>
              <p className="mb-0 fs-5 fw-bold text-success">
                Total Price : {Math.round(totalPrice)}$
              </p>
            </section>
            <section className="d-flex justify-content-end align-items-center text-danger p-2">
              <p className="mb-0 fs-5 fw-bold me-3">Clear cart ?!</p>
              <Button
                variant="warning"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                Clear
              </Button>
            </section>
          </section>
        </>
      )}
    </Container>
  );
};

export default Cart;
