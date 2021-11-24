# [React 공식문서](https://ko.reactjs.org/docs/hello-world.html) 읽고 정리하기
1. [JSX 소개](#1.-jsx-소개)
2. [엘리먼트 렌더링](#2.-엘리먼트-렌더링)
3. [Components와 Props](#3.-components와-props)
4. [State와 생명주기](#4.-state와-생명주기)

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

- JSX는 주입 공격을 방지한다
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
      <div><h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2></div>
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
