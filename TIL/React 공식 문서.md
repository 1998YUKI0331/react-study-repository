# [React 공식문서](https://ko.reactjs.org/docs/hello-world.html) 읽고 정리하기
1. [JSX 소개](#1-jsx-소개)
2. [엘리먼트 렌더링](#2-엘리먼트-렌더링)
3. [Components와 Props](#3-components와-props)
4. [State와 생명주기](#4-state와-생명주기)
5. [이벤트 처리하기](#5-이벤트-처리하기)
6. [조건부 렌더링](#6-조건부-렌더링)
7. [리스트와 Key](#7-리스트와-key)
8. [폼](#8-폼)
9. [State 끌어올리기](#9-state-끌어올리기)
10. [합성 vs 상속](#10-합성-vs-상속)

<br/>

## 1. JSX 소개
- JSX란? JavaScript + XML. 즉, JavaScript를 확장한 문법이다. 따라서 JavaScript의 모든 기능이 포함되어 있다.
  ```javascript
  const name = 'Josh Perez';
  const element = <h1>Hello, {name}</h1>;
  
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```
  - JSX는 React 엘리먼트를 생성한다. (내부적으로 React.createElement() 함수를 사용한다.)
  - JSX는 필수가 아니지만, 여러 이점(가독성 향상, 버그 발견 용이, XSS 방지 등)이 있기 때문에 권고하는 사항이다.
  - 위 코드와 같이 { } 안에는 유효한 JavaScript 표현식을 넣을 수 있다.
<br/>
 
- JSX도 표현식이다.
  - 컴파일이 끝나면 JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식된다.
  - 즉, JSX를 if 구문 및 for loop 안에서 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있다.
<br/>

- JSX 속성 정의와 자식 정의
  ```javascript
  const element = <img src={user.avatarUrl} />;
  ```
  ```javascript
  const element = (
    <div tabIndex="0">
      <h1>Hello!</h1>
      <h2>Good to see you here.</h2>
    </div>
  );
  ```
  - 어트리뷰트에 " " 혹은 { }를 사용하여 문자열 리터럴 혹은 JavaScript 표현식을 삽입할 수 있다.
  - 태그가 비어있다면 XML처럼 /> 를 이용해 닫아주어야 하며 혹은 자식을 포함할 수 있다.
<br/>

- JSX는 주입 공격을 방지한다.
  ```javascript
  render() {
    let codes = "<b>Will This Work?</b>";
      return (
        <div>{codes}</div>   // <b>Will This Work?</b>가 그대로 출력된다.
      );
    }
  ```
  - React DOM은 JSX의 값을 렌더링하기 전에 이스케이프 하므로, 명시적으로 작성되지 않은 내용은 주입되지 않는다.
    - 이스케이프란? 특정 문자를 HTML로 변환하는 행위. `&, <, >` 등의 문자를 `&amp;, &lt;, &gt;` 등으로.
<br/>

- JSX는 객체를 표현한다.
  ```javascript
  const element = (
    <h1 className="greeting">Hello, world!</h1>
  );
  ```
  ```javascript
  const element = React.createElement(
    'h1', {className: 'greeting'}, 'Hello, world!'
  );
  ```
  - Babel은 JSX를 React.createElement() 호출로 컴파일한다. 따라서 위 두 코드는 동일한 결과를 수행한다.
  - React.createElement()는 React 엘리먼트를 생성하는데 React는 이 객체로 DOM을 구성, 최신 상태로 유지한다.
<br/>

## 2. 엘리먼트 렌더링
- 엘리먼트란? React 앱의 가장 작은 단위를 나타낸다.
  - React 엘리먼트는 plain 객체이다. React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.
  - 컴포넌트와 엘리먼트의 개념을 혼동하기 쉬운데 엘리먼트는 컴포넌트의 구성요소이다.
<br/>

- DOM에 엘리먼트 렌더링하기
  ```javascript
  <div id="root"></div>
  ```
  ```javascript
  const element = <h1>Hello, world</h1>;
  ReactDOM.render(element, document.getElementById('root'));
  ```
  - React 애플리케이션은 일반적으로 하나의 root DOM 노드가 있다.
  - React 엘리먼트를 root DOM 노드에 렌더링하기 위해서는 둘 다 ReactDOM.render()로 전달하면 된다.
<br/>

- 렌더링 된 엘리먼트 업데이트하기
  ```javascript
  function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));  // <h2>부분만 업데이트
  }
  setInterval(tick, 1000);
  ```
  - React 엘리먼트는 불변객체이다. 따라서 엘리먼트 생성 후, 해당 엘리먼트의 자식이나 속성은 변경 불가다.
  - 엘리먼트는 하나의 프레임과 같이 특정 시점의 UI를 보여준다.
  - 따라서 UI를 업데이트하는 방법은 새로운 엘리먼트를 생성하고 이를 ReactDOM.render()로 전달하는 것이다.
  - React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전과 비교해서 변경된 부분만 업데이트 한다.
<br/>

## 3. Components와 Props
- 컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 개별적으로 살펴볼 수 있다.
  - 개념적으로 컴포넌트는 JavaScript 함수와 유사하다.
  - props라는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.
<br/>

- 함수 컴포넌트와 클래스 컴포넌트
  ```javascript
  function Welcome(props) {   // 함수 컴포넌트
    return <h1>Hello, {props.name}</h1>;
  }
  ```
  ```javascript
  class Welcome extends React.Component {   // 클래스 컴포넌트
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```
  - React 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일한 역할을 한다.
  - 클래스는 몇 가지 추가 기능이 있으며, 함수 컴포넌트가 간결성에서는 더 우수하다.
<br/>

- 컴포넌트 렌더링
  ```javascript
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element, document.getElementById('root')
  );
  ```
  - React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.
  - 사용자 정의 컴포넌트의 엘리먼트가 있으면 JSX 속성과 자식을 해당 컴포넌트에 단일 객체(props)로 전달한다.
    - 컴포넌트의 이름은 항상 대문자로 시작해야 한다. (소문자로 시작하면 DOM 태그로 처리해서)
<br/>

- 컴포넌트 합성과 추출
  ```javascript
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  function App() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }

  ReactDOM.render(
    <App />,   // Welcome을 여러 번 렌더링하는 App 컴포넌트
    document.getElementById('root')
  );
  ```
  - 컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수도 있다.
  - 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미한다.
  - 일반적으로 새 React 앱은 최상위에 단일 App 컴포넌트를 가지고 있다.
  - 합성이 된다는 것은 추출도 가능하다는 말. 재사용 가능한 컴포넌트는 개발이 더 효율적으로 되도록 한다.
<br/>

- props는 읽기 전용이다.
  - 컴포넌트의 props를 수정하면 안 된다. 모든 React 컴포넌트들은 동일한 props에 동일한 결과를 반환해야 한다.
  - 다음 장에 나올 state라는 개념으로 위 규칙을 위반하지 않고 컴포넌트들은 자신의 출력값을 변경할 수 있다.
<br/>

## 4. State와 생명주기
- 이전 섹션인 [엘리먼트 렌더링](#2-엘리먼트-렌더링)에서의 시계 예제 코드를 리팩토링 해보자.
  ```javascript
  function Clock(props) {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

  function tick() {
    ReactDOM.render(
      <Clock date={new Date()} />, document.getElementById('root')
    );
  }
  setInterval(tick, 1000);
  ```
  - Clock 컴포넌트를 완전히 재사용하고 캡슐화 하면 Clock은 스스로 타이머를 설정하고 매초 스스로 업데이트 한다.
  - 그러나 위 코드는 타이머를 설정하고 매초 UI를 업데이트하는 것이 누락되어 있다.
  - 이를 위해 Clock 컴포넌트에 state를 추가한다. State는 props와 유사하지만, 비공개이며 컴포넌트에 완전히 제어된다.
<br/>

- 클래스로 변환 뒤 로컬 state 추가하기
  ```javascript
  class Clock extends React.Component {
    constructor(props) {   // state 생성 (초기 this.state 지정)
      super(props);
      this.state = {date: new Date()};
    }

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Clock />, document.getElementById('root')
  );
  ```
  - constructor(props)를 보면 알 수 있듯이, 클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 한다. 
  - 타이머 코드는 아직 없으며, props를 state로 변경하는 거 까지 완료되었다.
<br/>

- 생명주기 메서드를 클래스에 추가하기
  ```javascript
  class Clock extends React.Component {
   // 위와 동일
    componentDidMount() {   // 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행
      this.timerID = setInterval(
        () => this.tick(), 1000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {   // Clock 컴포넌트가 매초 작동하도록 하는 메서드
      this.setState({   // 컴포넌트 로컬 state를 업데이트
        date: new Date()
      });
    }
    // 위와 동일
  }
  ```
  - Clock이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 한다. 이것은 React에서 “마운팅”이라고 한다.
  - Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 한다. 이것은 React에서 “언마운팅”이라고 한다.
  - 컴포넌트 클래스에서 메서드(생명주기 메서드)를 선언하여 마운트되거나 언마운트 시 특정 기능을 수행할 수 있다.
  - 위 코드에서 tick() 메서드에 있듯이, state 업데이트는 setState()를 통해서 가능하다.
<br/>

- State를 올바르게 사용하기
  - 직접 State를 수정하면 안된다. setState 없이 수정해봤자 렌더링 안된다.
  - State 업데이트는 비동기적일 수도 있다.
    ```javascript
    this.setState({   // Wrong
      counter: this.state.counter + this.props.increment,
    });
    ```
    ```javascript
    this.setState((state, props) => ({   // Correct
      counter: state.counter + props.increment
    }));
    ```
     - React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있다.
     - 따라서 this.props와 this.state가 비동기적일 수 있기 때문에 다음 state 계산에 해당 값들을 의존해서는 안 된다.
  - State 업데이트는 병합된다.
    ```javascript
    componentDidMount() {
      fetchPosts().then(response => {
        this.setState({
          posts: response.posts
        });
      });
      fetchComments().then(response => {
        this.setState({
          comments: response.comments
        });
      });
    }
    ```
    - setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.
    - 별도의 state가 독립적인 변수를 포함한다면 위처럼 setState() 호출로 변수를 독립적으로 업데이트할 수 있다.
    - 병합은 얕게 이루어지기 때문에 this.setState({comments})는 this.state.posts에 영향을 주지 않는다.
<br/>

- 데이터는 아래로 흐른다.
  - state는 로컬 또는 캡슐화라고도 불린다. state를 소유한 컴포넌트 이외에는 접근할 수 없습니다.
  - 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.
  - state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 “아래”에 있는 컴포넌트에만 영향을 미친다.
<br/>

## 5. 이벤트 처리하기
- React에서 이벤트를 처리하는 방식은 DOM에서의 방식과 유사하지만 몇 가지 문법 차이는 있다.
  ```javascript
  <button onclick="activateLasers()"> // HTML은 onclick이 소문자이며 "" 문자열
    Activate Lasers
  </button>
  ```
  ```javascript
  <button onClick={activateLasers}> // JSX는 camelCase이고 { } 함수
    Activate Lasers
  </button>
  ```
  - React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용한다.
  - JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.
<br/>

- React에서는 false를 반환해도 기본 동작을 방지할 수 없다. 반드시 preventDefault를 명시적으로 호출해야 한다. 
  ```javascript
  <form onsubmit="console.log('You clicked submit.'); return false">
    <button type="submit">Submit</button>   // HTML은 return false면 action이 실행되지 않음
  </form>
  ```
  ```javascript
  function Form() {
    function handleSubmit(e) { // e는 합성이벤트
      e.preventDefault();
      console.log('You clicked submit.');
    }
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }
  ```
  - 여기서 e는 합성이벤트이다. React는 W3C 명세에 따라 합성 이벤트를 정의한다.
<br/>

- React에선 addEventListener를 호출할 필요가 없이 엘리먼트가 처음 렌더링 될 때 리스너를 제공하면 된다.
  - ES6 클래스를 사용하여 컴포넌트를 정의할 떄, 일반적으로 이벤트 핸들러를 클래스의 메서드로 만든다.
    ```javascript
    class Toggle extends React.Component {
      constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        );
      }
    }

    ReactDOM.render(
      <Toggle />, document.getElementById('root')
    );
    ``` 
    - JSX 콜백 안에서 this의 의미는. 우선, JavaScript에서의 클래스 메서드는 기본적으로 바인딩이 되어 있지 않다.
    - this.handleClick을 바인딩 하지 않고 onClick에 전달하면, 함수가 실제 호출될 때 this는 undefined가 된다. 
    - onClick={this.handleClick}과 같이 뒤에 ()를 사용하지 않고 메서드를 참조할 경우, 메소드를 바인딩 해야 한다.
  - 실험적인 퍼블릭 클래스 필드 문법을 사용한다면, 클래스 필드를 사용하여 콜백을 바인딩 할 수 있다.
    ```javascript
    class LoggingButton extends React.Component {
      // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
      // 주의: 이 문법은 *실험적인* 문법입니다.
      handleClick = () => {
        console.log('this is:', this);
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            Click me
          </button>
        );
      }
    }
    ``` 
    - Create React App에서는 이 문법이 기본적으로 설정되어 있다.
  - 클래스 필드 문법을 사용하고 있지 않다면, 콜백에 화살표 함수를 사용하는 방법도 있다. 
    ```javascript
    class LoggingButton extends React.Component {
      handleClick() {
        console.log('this is:', this);
      }

      render() {
      // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
        return (
          <button onClick={() => this.handleClick()}>
            Click me
          </button>
        );
      }
    }
    ``` 
    - 이 문법의 문제점은 LoggingButton이 렌더링될 때마다 다른 콜백이 생성된다는 것이다. 
    - 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다. 
    - 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장한다.
<br/>

- 이벤트 핸들러에 인자 전달하기
  ```javascript
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```
  - 위 두 줄은 동등하며 두 경우 모두 React 이벤트를 나타내는 e 인자가 ID 뒤에 두 번째 인자로 전달된다.
  - 화살표 함수는 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 추가 인자가 자동으로 전달된다.
<br/>

## 6. 조건부 렌더링
- React에서 조건부 렌더링은 JavaScript에서처럼 if 같은 조선부 연산자로 동작한다.
  ```javascript
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />; // 로그인 시 나타낼 컴포넌트
    }
    return <GuestGreeting />;  // 로그인 안했을 때 나타낼 컴포넌트
  }
  
  ReactDOM.render(
    <Greeting isLoggedIn={false} />, // Try changing to isLoggedIn={true}
    document.getElementById('root')
  );
  ```
  - 위 코드는 isLoggedIn prop에 따라서 다른 인사말(컴포넌트)을 렌더링 한다.
<br/>

- 엘리먼트 변수 사용하기 (컴포넌트의 일부만 조건부 렌더링)
  ```javascript
  class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }
    
    handleLoginClick() { this.setState({isLoggedIn: true}); }
    handleLogoutClick() { this.setState({isLoggedIn: false}); }
    
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
      
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }
  ```
  - LoginControl 컴포넌트는 현재 상태에 맞게 <LoginButton />이나 <LogoutButton />을 렌더링한다.
  - 또한 이전 예시에서의 <Greeting />도 함께 렌더링한다.
<br/>

- if문이 아닌 다른 조건부 연산자 사용하기
  ```javascript
  {unreadMessages.length > 0 &&
    <h2>
      You have {unreadMessages.length} unread messages.
    </h2>
  }
  ```
  ```javascript
  {isLoggedIn
    ? <LogoutButton onClick={this.handleLogoutClick} />
    : <LoginButton onClick={this.handleLoginClick} />
  }
  ```
  - && 뒤의 엘리먼트는 조건이 true일때 출력된다. 조건이 false라면 React는 무시하고 건너뛴다.
  - condition ? true: false를 사용해서도 조건부 렌더링이 가능하다.
<br/>

- 컴포넌트가 렌더링하는 것을 막기
  ```javascript
  function WarningBanner(props) {
    if (!props.warn) return null;
    return (
      <div className="warning">Warning!</div>
    );
  }
  
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showWarning: true};
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }
  
    handleToggleClick() {
      this.setState(state => ({
        showWarning: !state.showWarning
      }));
    }
  
    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      );
    }
  }
  ```
  - 컴포넌트 자체를 숨기고 싶다면 렌더링 결과를 출력하는 대신 null을 반환해준다.
  - 위 코드에서는 `<WarningBanner />`가 warn prop이 false라면 컴포넌트는 렌더링하지 않게 된다.
  - 컴포넌트의 render에서 null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다.
<br/>

## 7. 리스트와 Key
- 여러개의 컴포넌트 렌더링 하기
  ```javascript
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((numbers) =>
    <li>{numbers}</li>
  );
  
  ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
  );
  ```
  - map() 함수로 numbers 배열에 대한 `<li>`엘리먼트를 반환하고 엘리먼트 배열을 listItems에 저장한다.
  - 그리고 listItems 배열을 `<ul>`엘리먼트 안에 포함하고 DOM에 렌더링한다.
<br/>

- 기본 리스트 컴포넌트
  ```javascript
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```
  - 앞선, 여러개의 컴포넌트 렌더링 하기 예제를 하나의 컴포넌트 안에서 렌더링 되도록 리팩토링 한 것이다.
  - 리스트에는 key(엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트)가 필요하다.
<br/>

- Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.
  ```javascript
  const todoItems = todos.map((todo) =>
    <li key={todo.id}>
      {todo.text}
    </li>
  );
  ```
  - key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 한다.
  - 데이터의 ID와 같은 리스트의 다른 항목들에서 항목을 고유하게 식별할 수 있는 문자열을 Key로 선택한다.
  - 항목의 순서가 바뀔 수 있는 경우 key에 리스트 인덱스를 사용하는 것은 권장하지 않는다.
<br/>

- Key로 컴포넌트 추출하기
  ```javascript
  function ListItem(props) {
    return <li>{props.value}</li>; // 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
  }
  
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <ListItem key={number.toString()} value={number} /> // 맞습니다! 배열 안에 key를 지정해야 합니다.
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```
  - 키는 주변 배열의 context에서만 의미가 있다. (배열을 직접 쓰는 map안에서는 꼭 Key 지정)
  - ListItem 컴포넌트 안 `<li>` 엘리먼트가 아니라 `<ListItem />` 엘리먼트가 key를 가져야 한다.
<br/>

- Key는 형제 사이에서만 고유한 값이어야 한다.
  ```javascript
  const content = posts.map((post) =>
    <Post
      key={post.id}
      id={post.id}
      title={post.title} />
  );
  ```
  - Key는 전역적으로 고유할 필요는 없다. 두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있다.
  - key는 컴포넌트로 전달되지 않는다. 컴포넌트에서 key가 필요하면 다른 이름의 prop으로 명시적으로 전달한다.
  - 위 예시에서 Post 컴포넌트는 props.id를 읽을 수 있지만 props.key는 읽을 수 없다.
<br/>

- JSX에 map() 포함시키기
  ```javascript
  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()} value={number} />
        )}
      </ul>
    );
  }
  ```
  - JSX를 사용하면 { } 안에 map() 함수의 결과를 인라인 처리할 수 있다.
  - 하지만 이 방식을 남발하는 것은 좋지 않다. 가독성을 위해 변수로 추출할지, 인라인으로 넣을지는 개발자가 판단해야 한다.
  - map() 함수가 너무 중첩된다면 컴포넌트로 추출하는 것이 좋다.
<br/>

## 8. 폼
- 신뢰 가능한 단일 출처 (single source of truth)
  - HTML에서 <input>, <textarea>와 같은 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 state를 관리하고 업데이트한다.
  - React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 setState()에 의해 업데이트된다.
<br/>
  
- 제어 컴포넌트 (Controlled Component)
  ```javascript
  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''}; // name
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  ```
  - value는 폼 엘리먼트에 설정되므로 항상 this.state.value가 표시되며 React state는 신뢰 가능한 단일 출처가 된다.
  - state를 업데이트하기 위해 모든 키 입력에서 handleChange가 동작해서 사용자가 입력할 때 보여지는 값이 업데이트된다.
<br/>

- textarea 태그
  ```javascript
  <textarea value={this.state.value} onChange={this.handleChange} />
  ```
  - HTML에서 `<textarea>`는 텍스트를 자식으로 정의하지만 React에서 `<textarea>`는 value 어트리뷰트를 대신 사용한다.
<br/>

- select 태그
  ```javascript
  this.state = {value: 'coconut'};

  <select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
  </select>
  ```
  - HTML에서 `<select>`의 selected 옵션은 해당 사항을 초기값으로 설정해주는 어트리뷰트다.
  - React에서는 selected 어트리뷰트를 사용하는 대신 최상단 select태그에 value 어트리뷰트를 사용한다.
<br/>

- file input 태그
  ```javascript
  <input type="file" />
  ```
  - 파일은 값이 읽기 전용이기 때문에 React에서는 비제어 컴포넌트이다.
<br/>

- 다중 입력 제어하기
  ```javascript
  class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
        [name]: value // 주어진 name에 일치하는 state 업데이트 하기 위해 computed property name 구문
      });
    }

    render() {
      return (
        <form>
          <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label><br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }
  ```
  - 여러 input 제어 시, 각 엘리먼트에 name 어트리뷰트를 추가하고 event.target.name으로 핸들러가 판단한다.
  - setState()는 자동적으로 현재 state에 일부 state를 병합하기 때문에 바뀐 부분에 대해서만 호출하면 된다.
<br/>

- 제어되는 Input Null 값
  ```javascript
  ReactDOM.render(<input value="hi" />, mountNode); // 잠겨있지만

  setTimeout(function() {
    ReactDOM.render(<input value={null} />, mountNode); // 수정 가능해짐
  }, 1000);
  ```
  - 제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다.
  - value를 설정했는데 여전히 수정할 수 있다면 실수로 value를 undefined나 null로 설정했을 수 있다.
<br/>

## 9. State 끌어올리기
- 언제 하면 좋나
  - 종종 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있다.
  - 이럴 때는 공통 조상으로 state를 끌어올리는 것이 좋다.
<br/>

- 두 번째 Input 추가하기
  ```javascript
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
  
  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {temperature: ''};
    }
  
    handleChange(e) {
      this.setState({temperature: e.target.value});
    }
  
    render() {
      const temperature = this.state.temperature;
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={temperature} onChange={this.handleChange} />
        </fieldset>
      );
    }
  }
  ```
  ```javascript
  class Calculator extends React.Component {
    render() {
      return (
        <div>
          <TemperatureInput scale="c" />
          <TemperatureInput scale="f" />
        </div>
      );
    }
  }
  ```
  - Calculator에서 TemperatureInput 컴포넌트를 빼서 Calculator가 분리된 두 개의 온도 입력 필드를 렌더링한다.
  - 그러나 Calculator에서 BoilingVerdict에게 온도를 전해줄 수 없다.
  - 현재 입력된 온도 정보가 TemperatureInput 안에 숨겨져 있으므로 Calculator는 그 값을 알 수 없기 때문이다.
<br/>

- State 끌어올리기
  - 섭씨와 화씨가 서로 동기되도록 하고 싶다면 가까운 공통 조상으로 state를 끌어올린다.
  - TemperatureInput이 개별적으로 가지고 있던 지역 state를 지우고 Calculator로 그 값을 옮겨놓는다.
  - Calculator는 두 입력 필드의 현재 온도에 대한 진리의 원천(source of truth)이 된다.
  - 두 TemperatureInput의 props가 같은 부모인 Calculator로부터 전달되기 때문에 항상 동기화된 상태를 유지한다.
<br/>

- TemperatureInput 변경
  ```javascript
  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
      this.props.onTemperatureChange(e.target.value); // Before: this.setState({temperature: e.target.value});
    }
  
    render() {
      const temperature = this.props.temperature; // Before: const temperature = this.state.temperature;
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={temperature} onChange={this.handleChange} />
        </fieldset>
      );
    }
  }
  ```
  - TemperatureInput 컴포넌트에서 this.state.temperature를 this.props.temperature로 대체한다.
  - props는 읽기 전용이다. 따라서 onTemperatureChange로 이 컴포넌트를 제어가능하게 만들어야 한다.
  - TemperatureInput은 temperature와 onTemperatureChange props를 부모인 Calculator로부터 건네받을 수 있다.
  - 이제 TemperatureInput에서 온도를 갱신하고 싶으면 this.props.onTemperatureChange를 호출하면 된다.
  - onTemperatureChange prop은 부모 컴포넌트인 Calculator로부터 temperature prop와 함께 제공된다.
<br/>

- Calculator 변경
  ```javascript
  class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
      this.state = {temperature: '', scale: 'c'};
    }
  
    handleCelsiusChange(temperature) {
      this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange(temperature) {
      this.setState({scale: 'f', temperature});
    }
    
    render() {
      const scale = this.state.scale;
      const temperature = this.state.temperature;
      const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
      const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

      return (
        <div>
          <TemperatureInput
            scale="c" 
            temperature={celsius}
            onTemperatureChange={this.handleCelsiusChange} />
          <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={this.handleFahrenheitChange} />
          <BoilingVerdict
            celsius={parseFloat(celsius)} />
        </div>
      );
    }
  }
  ```
  - 두 입력 필드를 모두 저장하는 건 불필요하다. 최근의 입력값과 단위만 저장하면 된다.
  - 어떤 입력 필드를 수정하든 간에 Calculator의 this.state.temperature와 this.state.scale이 갱신된다.
<br/>

- 입력값을 변경할 때 일어나는 일
  - React는 DOM <input>의 onChange에 지정된 함수를 찾는다. TemperatureInput의 handleChange 메서드에 해당한다.
  - TemperatureInput의 handleChange는 새로 입력된 값과 함께 this.props.onTemperatureChange()를 호출한다.
  - Calculator에서 어떤 입력 필드를 수정하느냐에 따라서 Calculator의 두 단위 변환 메서드 중 하나가 호출된다.
  - 내부적으로 Calculator는 새 입력값, 단위로 this.setState()를 호출해서 React에게 자신을 재렌더링하도록 요청한다.
  - React는 UI가 어떻게 보여야 하는지 알아내기 위해 Calculator 컴포넌트의 render 메서드를 호출한다.
  - 두 입력 필드의 값은 현재 온도와 활성화된 단위를 기반으로 재계산된다. 온도의 변환이 이 단계에서 수행된다.
  - React는 Calculator가 전달한 새 props와 함께 각 TemperatureInput의 render를 호출한다. (UI 알아내기 위해)
  - React는 BoilingVerdict 컴포넌트에게 섭씨온도를 props로 건네면서 그 컴포넌트의 render 메서드를 호출한다.
  - React DOM은 물의 끓는 여부와 올바른 입력값을 일치시키는 작업과 함께 DOM을 갱신한다.
  - 값을 변경한 입력 필드는 현재 입력값을 그대로 받고, 다른 입력 필드는 변환된 온도 값으로 갱신된다.
<br/>

## 10. 합성 vs 상속
- 리액트는 강력한 합성 모델을 가지고 있다.
  - 개발자들은 종종 상속으로 인한 몇 가지 문제들을 만나며 합성을 통해 이러한 문제를 해결할 수 있다.
  - 따라서 리액트는 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것을 권고한다.
<br/>

- 컴포넌트에서 다른 컴포넌트를 담기
  ```javascript
  function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }
  ```
  ```javascript
  function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">Welcome</h1>
        <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
      </FancyBorder>  // <FancyBorder> JSX 안에 있는 것들이 FancyBorder 컴포넌트의 children prop으로 전달
    );
  }
  ```
  - 박스 역할을 하는 Sidebar, Dialog와 같은 컴포넌트에서는 어떤 엘리먼트가 들어올지 예상할 수 없는 경우가 있다.
  - 이러한 컴포넌트에서는 children prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋다.
<br/>

- 특수화
  ```javascript
  function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }
  ```
  ```javascript
  function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">{props.title}</h1>
        <p className="Dialog-message">{props.message}</p>
      </FancyBorder>
    );
  }
  function WelcomeDialog() {
    return (
      <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />
    );
  }
  ```
  - 때로는 컴포넌트의 특수한 경우인 컴포넌트를 고려해야 한다. 예를 들어, WelcomeDialog는 Dialog의 특수한 경우다.
  - 합성을 통해, 더 구체적인 컴포넌트가 일반적인 컴포넌트를 렌더링하고 props를 통해 내용을 구성한다.
<br/>
 
