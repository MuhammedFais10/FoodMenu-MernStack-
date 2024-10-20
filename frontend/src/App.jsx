import AppRouter from "./AppRouter";
import "./App.css";
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
import { useLoading } from "./Components/hooks/useLoading";
import { useEffect } from "react";
import { setLoadingInterceptor } from "./interceptors/loadingInterceptor.jsx";

function App() {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return (
    <>
      <div>
        <Loading />
        <Header />
        <AppRouter />
      </div>
    </>
  );
}

export default App;
