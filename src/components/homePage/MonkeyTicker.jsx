import Ticker from "react-ticker";

const MonkeyTicker = (props) => {
  return (
    <Ticker>
      {() => (
        <div
          style={{ height: "200px", width: "max-content", margin: "40px 0px" }}
        >
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk0t.png"
            alt="Monkey #0"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk1t.png"
            alt="Monkey #1"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk2t.png"
            alt="Monkey #2"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk3t.png"
            alt="Monkey #3"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk4t.png"
            alt="Monkey #4"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk5t.png"
            alt="Monkey #5"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk6t.png"
            alt="Monkey #6"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk7t.png"
            alt="Monkey #7"
          />
          <img
            style={{ width: 200, marginRight: "10px" }}
            src="assets/img/mk8t.png"
            alt="Monkey #8"
          />
        </div>
      )}
    </Ticker>
  );
};

export default MonkeyTicker;
