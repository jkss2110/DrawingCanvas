import './App.css';
import LoadingIndicator from './components/LoadingIndicator/loadingIndicator.component';
import QuickDraw from './components/QuickDraw/quickdraw-component';

function App() {
  return (
    <div className="App">
      <QuickDraw></QuickDraw>,
      <LoadingIndicator></LoadingIndicator>
    </div>
  );
}

export default App;
