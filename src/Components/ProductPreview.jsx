import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../RTK/Slices/CartSlice";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../RTK/Slices/ProductsSlice";
import Loading from "./Loading";

const ProductPreview = () => {
  const params = useParams();
  const loading = useSelector((state) => state.proudcts.loading);
  const state = useSelector((state) => state.proudcts.singleProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductById(params.id));
  }, []);
  return (
    <Container className="my-4">
      <Row className="g-5 justify-content-center align-items-end">
        {loading === "pending" ? (
          <Loading size={"large"} />
        ) : (
          <>
            <Col md="4">
              <Card.Img variant="top" src={state?.image} className="w-100" />
            </Col>
            <Col md="8 py-5">
              <Card.Body className="mb-5 py-5">
                <Card.Title className="mb-4 fw-bold">{state?.title}</Card.Title>
                <Card.Text>{state?.description}</Card.Text>
              </Card.Body>
              <section className="d-flex justify-content-between align-items-center mt-5">
                <Button
                  variant="primary"
                  onClick={() => {
                    dispatch(addToCart(state));
                  }}
                >
                  Add to cart
                </Button>
                <p className="mb-0 fs-5 text-success fw-bold">
                  {state?.price}$
                </p>
              </section>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProductPreview;
