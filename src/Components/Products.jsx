import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../RTK/Slices/ProductsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../RTK/Slices/CartSlice";
import Loading from "./Loading";

const Products = () => {
  const loading = useSelector((state) => state.proudcts.loading);
  const state = useSelector((state) => state.proudcts.productsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <Container className="mt-5">
      <Row className="g-4 justify-content-center align-items-center">
        {loading === "pending" ? (
          <Loading size={"large"} />
        ) : (
          state.map((product, id) => {
            return (
              <Col md="4" key={id}>
                <Card className="p-2">
                  <Link
                    to={`/products/${product.id}`}
                    key={id}
                    className="text-decoration-none"
                  >
                    <section className="p-3">
                      <Card.Img
                        style={{ height: "200px", width: "200px" }}
                        className="w-100"
                        variant="top"
                        src={product.image}
                      />
                    </section>
                  </Link>

                  <Card.Body>
                    <Card.Title>{product.title.substring(0, 20)}</Card.Title>
                    <Card.Text>
                      {product.description.substring(0, 30)}
                      <br />
                    </Card.Text>
                    <section className="d-flex justify-content-between align-items-center">
                      <Button
                        variant="primary"
                        onClick={() => {
                          dispatch(addToCart(product));
                        }}
                      >
                        Add to cart
                      </Button>
                      <p className="mb-0 fs-5 text-success fw-bold">
                        {product.price}$
                      </p>
                    </section>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default Products;
