import { Container, Content, Row } from "./styles";
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [operand1, setOperand1] = useState(0);
  const [operator, setOperator] = useState("");

  const [reseter, setReseter] = useState("0");

  const handleAddNumber = (number) => {
    setCurrentNumber((prev) => `${prev === reseter ? "" : prev}${number}`);
    if (reseter !== "0") {
      setReseter("0");
    }
  };

  const handleOperation = (op) => {
    if (operand1 === 0) {
      setOperator(op);
      setOperand1(currentNumber);
      setReseter(currentNumber);
    } else {
      setOperator(op);
      handleOnCalc();
    }
  };

  const handlePercentage = () => {
    let res = Number((operand1 * currentNumber) / 100);
    setCurrentNumber(res);
  };

  const handleOnClear = () => {
    setCurrentNumber("0");
    setOperand1(0);
    setOperator("");
    setReseter("0");
  };

  const changeSignal = () => {
    setCurrentNumber(Number(currentNumber * -1));
  };

  const dot = () => {
    setCurrentNumber(`${currentNumber}.`);
  };

  const handleOnCalc = () => {
    let res = 0;
    switch (operator) {
      case "+":
        res = Number(operand1) + Number(currentNumber);
        break;

      case "-":
        res = Number(operand1) - Number(currentNumber);
        break;

      case "*":
        res = Number(operand1) * Number(currentNumber);
        break;

      case "/":
        res = Number(operand1) / Number(currentNumber);
        break;

      default:
        break;
    }
    setOperand1(0);
    setCurrentNumber(res);
    setReseter(res);
  };

  const handleOnBackspace = () => {
    if (currentNumber.length === 1) {
      setCurrentNumber("0");
    } else {
      setCurrentNumber(
        currentNumber
          .toString()
          .substring(0, currentNumber.toString().length - 1)
      );
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="<" onClick={() => handleOnBackspace()} />
          <Button label="C" onClick={() => handleOnClear()} />
          <Button label="%" onClick={() => handlePercentage()} />
          <Button label="/" onClick={() => handleOperation("/")} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button label="x" onClick={() => handleOperation("*")} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="-" onClick={() => handleOperation("-")} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="+" onClick={() => handleOperation("+")} />
        </Row>
        <Row>
          <Button label="±" onClick={() => changeSignal()} />
          <Button label="0" onClick={() => handleAddNumber("0")} />
          <Button label="," onClick={() => dot()} />
          <Button label="=" onClick={() => handleOnCalc()} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
