## tic-tac-toe (21.11.23.)
- 부모에서 자식으로 props 전달
  ```javascript
  class Square extends React.Component {
    render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      );
    }
  }
  ```
  ```javascript
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;
    }

    render() {
      return (
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
      );
    }
  }
  ```
  - 각각의 컴포넌트들은 props라는 매개변수를 받아오고 render 함수를 통해 화면에 표시한다.
  - 위 코드에서는 부모 Board 컴포넌트에서 자식 Square 컴포넌트로 props가 전달되고 있다.

<br/>

- state 사용해서 상태 기억하기
  ```javascript
  constructor(props) {
    super(props); // 자식 클래스에서 생성자 정의할 때는 super 사용
    this.state = {
      value: null,
    };
  }
  ```
  - 컴포넌트는 생성자(constructor)에 this.state를 설정하는 것으로 state를 가질 수 있다.
  - setState()를 사용하면 state를 업데이트 할 수 있다. (해당 컴포넌트가 다시 렌더링 됨)

<br/>

- state를 부모 컴포넌트로 끌어올리기
  ```javascript
  class Square extends React.Component {
    render() {
      return (
        <button
          className="square"
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
  ```
  ```javascript
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice(); // 불변성을 위해 slice 사용
      squares[i] = 'X';
      this.setState({squares: squares});
    }

    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }

    render() {
      return (
        <div className="board-row">
            {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
      );
    }
  }
  ```
  - 컴포넌트는 자신이 정의한 state에만 접근할 수 있으므로 Square에서 이벤트가 발생할 때 Board를 호출한다.
  - state를 부모 컴포넌트로 끌어올리기 위해 부모 컴포넌트에서 생성자를 통해 state를 설정한다.
  - Square 클릭 -> Square가 this.props.onClick() 호출 -> (props는 Board에 있으므로) -> Board가 handleClick(i) 호출