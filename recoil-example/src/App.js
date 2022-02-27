import { RecoilRoot } from 'recoil';
import TodoList from './todo/TodoList';

const App = () => {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  )
}

export default App;