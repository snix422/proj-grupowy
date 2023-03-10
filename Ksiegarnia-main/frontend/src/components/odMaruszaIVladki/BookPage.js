import NavBar from "./NavBar";
import Footer from "./Footer";
import { useContext, useState } from "react";
import InfoBook from "../../Context/InfoBook";
import imgGoldStar from "../../images/GoldStar.png";

const BookPage = (props) => {
  const [showBorderOpis, setShowBorderOpis] = useState("border-yes");
  const [showBorderOpinie, setShowBorderOpinie] = useState("border-none");
  const [showBorderOcena, setShowBorderOcena] = useState("border-none");
  const [comments, setComments] = useState([]);
  const [termComment, setTermComment] = useState("");
  const [showInfoBook, setShowInfoBook] = useState(false);
  const [showInfoMark, setShowInfoMark] = useState(false);
  const [radio, setRadio] = useState(0);

  const BookInformation = useContext(InfoBook);

  const clickOpis = () => {
    if (showBorderOpis === "border-none") {
      setShowBorderOpis("border-yes");
      setShowBorderOpinie("border-none");
      setShowBorderOcena("border-none");
    }
  };

  const clickOpinie = () => {
    if (showBorderOpinie === "border-none") {
      setShowBorderOpis("border-none");
      setShowBorderOpinie("border-yes");
      setShowBorderOcena("border-none");
    }
  };

  const clickOcena = () => {
    if (showBorderOcena === "border-none") {
      setShowBorderOpis("border-none");
      setShowBorderOpinie("border-none");
      setShowBorderOcena("border-yes");
    }
  };

  const updateTermComment = (e) => {
    setTermComment(e.target.value);
  };

  const AddComment = () => {
    setComments([...comments, termComment]);
    setTermComment("");
  };

  const markBook = () => {
    setShowInfoBook(true);
  };
  const displayAlert = () => {
    setShowInfoBook(false);
  };

  const useRadio = (e) => {
    setRadio(e.target.value);
    console.log(e.target.value);
  };

  console.log(props.title);

  return (
    <>
      <NavBar />
      <div className="book-page">
        <div className="book-details">
          <div className="book-details-pro"></div>
          <img className="book-details-img" src={BookInformation.image}></img>
          <div className="book-details-text">
            <div className="books">
              <h4>{BookInformation.title}</h4>
              <div className="book-author">
                <span>Autor: </span>
              </div>
              <div className="book-year">
                <span>Rok wydania:</span>
              </div>
              <div className="book-category">
                <span>Kategoria:</span>
              </div>
            </div>
            <div className="book-reply">
              <span className="txt">{BookInformation.author}</span>
              <span className="txt">2002</span>
              <span className="txt">Romantyczne</span>
            </div>
          </div>

          <div className="book-price">
            <span>{BookInformation.price} z??</span>
            <button>Do koszyka</button>
          </div>
        </div>
        <div className="book-opinie">
          <div className="opinie-choose">
            <ul>
              <li className={showBorderOpis} onClick={clickOpis}>
                Opis
              </li>
              <li className={showBorderOpinie} onClick={clickOpinie}>
                Opinie
              </li>
              <li className={showBorderOcena} onClick={clickOcena}>
                Ocena
              </li>
            </ul>
          </div>
          {showBorderOpis === "border-yes" ? (
            <p>
              Warszawa, wiosna 1938 roku. Osiemnastoletnia Zuzanna wierzy, ??e
              jej ??ycie b??dzie us??ane r????ami. Pewnego dnia zachwyca j?? wygrywana
              na skrzypcach melodia, a kilka miesi??cy p????niej poznaje zdolnego
              muzyka i traci dla niego g??ow??. Rodzi si?? pierwsza mi??o????,
              pojawiaj?? marzenia i plany, a potem przychodzi wojna. Znaczy
              kolejne miesi??ce pasmem strat, cierpienia i b??lu??? Zuzanna zaczyna
              prac?? na Poczcie G????wnej i w????cza si?? w podziemn?? walk?? z
              okupantem. Zostaje przydzielona do kom??rki ???P??? zajmuj??cej si??
              przechwytywaniem anonimowych donos??w pisanych przez Polak??w do
              ???Szanownego Pana Gestapo???. Jeden z list??w rozdziera jej serce.
              Okazuje si??, ??e dzia??alno???? konspiracyjna to niebezpieczna gra, w
              kt??rej stawk?? jest nie tylko ??ycie, ale i mi??o????. Listy do Gestapo
              to poruszaj??ca do g????bi spowied?? kobiety, kt??ra stan????a przed
              dramatycznymi wyborami. Opowie???? o ??yciu brutalnie zmienionym
              przez wojn??. O ranach, kt??re nigdy si?? nie goj??, winach, kt??re
              domagaj?? si?? odkupienia, i przebaczeniu, kt??re by?? mo??e nie
              nadejdzie.
            </p>
          ) : null}{" "}
          {showBorderOpinie === "border-yes" ? (
            <>
              <p>Opinie({comments.length})</p>{" "}
              <textarea
                value={termComment}
                onChange={updateTermComment}
                className="form-control"
                placeholder="Wpisz sw??j komentarz"
              ></textarea>{" "}
              <button className="btn btn-primary" onClick={AddComment}>
                Dodaj komentarz
              </button>
              {comments.map((comment) => {
                return (
                  <div class="card bg-dark text-light">
                    <div className="card-title">Nazwa u??ytkownika</div>
                    <div class="card-body">{comment}</div>
                  </div>
                );
              })}
            </>
          ) : null}
          {showBorderOcena === "border-yes" ? (
            <>
              <div className="stars">
                <h3>Twoja Ocena</h3>
                <div className="star-1">
                  {" "}
                  <label>
                    <input
                      onChange={useRadio}
                      id="first"
                      name="first"
                      value="first"
                      type="radio"
                      checked={radio === "first"}
                    />
                  </label>
                  <img src={imgGoldStar}></img>
                  <span>1.0</span>
                </div>
                <div className="star-2">
                  {" "}
                  <label>
                    <input
                      onChange={useRadio}
                      id="second"
                      name="second"
                      value="second"
                      type="radio"
                      checked={radio === "second"}
                    />
                  </label>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <span>2.0</span>
                </div>
                <div className="star-3">
                  {" "}
                  <label>
                    <input
                      onChange={useRadio}
                      id="third"
                      name="third"
                      value="third"
                      type="radio"
                      checked={radio === "third"}
                    />
                  </label>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <span>3.0</span>
                </div>
                <div className="star-4">
                  {" "}
                  <label>
                    <input
                      onChange={useRadio}
                      id="four"
                      name="four"
                      value="four"
                      type="radio"
                      checked={radio === "four"}
                    />
                  </label>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <span>4.0</span>
                </div>
                <div className="star-5">
                  {" "}
                  <label>
                    <input
                      onChange={useRadio}
                      id="five"
                      name="five"
                      value="five"
                      type="radio"
                      checked={radio === "five"}
                    />
                  </label>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <img src={imgGoldStar}></img>
                  <span>5.0</span>
                </div>
                <button className="btn btn-primary" onClick={markBook}>
                  Wy??lij ocen??
                </button>
                {showInfoBook === true ? (
                  <>
                    <div className="alert alert-success">
                      Ksi????ka zosta??a oceniona
                    </div>
                    <button className="btn btn-primary" onClick={displayAlert}>
                      Ok
                    </button>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookPage;
