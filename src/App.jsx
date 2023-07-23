import { useState } from "react";
import AppRouter from "./router";
import { LoadingPage } from "./pages";

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {
        loading ? <LoadingPage /> : <AppRouter />
      }
    </>
  )
}

export default App
