import { Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar.js";
import Spinner from "./components/navbar/Spinner.js";
import "./css/app.css";
const Chess = lazy(() => import('./components/chess/Chess.js'));
const ChessTwo = lazy(() => import('./components/chess/ChessTwo.js'));
const Home = lazy(() => import('./components/Home.js'));
const MemoryGame = lazy(() => import('./components/memoryGame/MemoryGame.js'));

function App() {
  return (
    <Fragment >
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Suspense fallback={<Spinner />}><Home /></Suspense>} />
          <Route exact path="/chessOne" element={<Suspense fallback={<Spinner />}><Chess /></Suspense>} />
          <Route exact path="/chessTwo" element={<Suspense fallback={<Spinner />}><ChessTwo /></Suspense>} />
          <Route exact path="/memoryGame" element={<Suspense fallback={<Spinner />}><MemoryGame /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
