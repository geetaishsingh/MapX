import flask from "../assets/flask.png";
import game from "../assets/game.png";
import calculate from "../assets/calculator.png";
import science from "../assets/science.png";

const arr = [
  {
    Image: "flask",
    id: "13",
    para: "Interactive Labs",
  },
  {
    Image: "game",
    id: "10",
    para: "Interactive Labs",
  },
  {
    Image: "calculate",
    id: "10",
    para: "Maths Labs",
  },
  {
    Image: "science",
    id: "3",
    para: "Science Labs",
  },
];

const Section22 = () => {
  return (
    <div className="section22">
      <div className="container">



        <div className="section-box">
          {arr.map((element, index) => {
            <div className="four-box" key={index}>
              <div className="box-img">
                <img src={element.Image} alt="" />
              </div>
              <div className="box-text">
                <h1>{element.id}</h1>
                <p> {element.para}</p>
              </div>
            </div>;
          })}
        </div>











      </div>
    </div>
  );
};

export default Section22;
