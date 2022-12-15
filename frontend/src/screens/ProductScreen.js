import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import imgGoldStar from "../images/GoldStar.png";
import { useState } from "react";
import "../App.css";



const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



function ProductScreen() {

  const [showInfoBook, setShowInfoBook] = useState(false);
const [showInfoMark, setShowInfoMark] = useState(false);
const [radio, setRadio] = useState('');
const [comments, setComments] = useState([]);
const [termComment, setTermComment] = useState('');



  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Przepraszamy, produkt nie znajduje się w magazynie");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  const displayAlert = () => {
    setShowInfoBook(false);
    setRadio('');
}

const useRadio = (e) => {
    setRadio(e.target.value);
    console.log(e.target.value);
}

const markBook = () => {
  if(radio === ''){
    setShowInfoBook(false);
  }else
  setShowInfoBook(true);
  
}

const updateTermComment = (e) => {
  setTermComment(e.target.value);
}

const AddComment = () => {
  setComments([...comments, termComment]);
  setTermComment('');
}

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.title}</title>
              </Helmet>
              <h1>{product.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Cena : {product.price}PLN</ListGroup.Item>
            <ListGroup.Item>
              Opis:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Cena:</Col>
                    <Col>PLN{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">W Magazynie</Badge>
                      ) : (
                        <Badge bg="danger">Niedostępne</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Dodaj do koszyka
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col className="stars-col" md={3}>
        <textarea value={termComment} onChange={updateTermComment} className="form-control" placeholder="Wpisz swój komentarz"></textarea> <button className="btn btn-primary" onClick={AddComment}>Dodaj komentarz</button>
        {comments.map((comment)=>{
            return(
                <div class="card bg-dark text-light">
                    <div className="card-title">Nazwa użytkownika</div>
                    <div class="card-body">
                        {comment}
                     </div>
                </div>
               )
        })}
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;
