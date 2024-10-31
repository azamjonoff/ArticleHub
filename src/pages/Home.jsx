// redux
import { useDispatch, useSelector } from "react-redux";

// lib
import { getArticles } from "../lib/requests";

// react
import { useEffect, useRef, useState } from "react";

// loading
import LoadingBar from "react-top-loading-bar";

// features
import { setArticles } from "../features/articleSlice";

// toast
import toast from "react-hot-toast";

// components
import { Cards, Filter, Hero } from "../components";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loadingRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { article } = useSelector((state) => state.article);

  useEffect(() => {
    loadingRef?.current.continuousStart();
    setLoading(true);
    getArticles()
      .then((res) => {
        dispatch(setArticles(res));
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        loadingRef?.current.complete();
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <LoadingBar color="#000000" ref={loadingRef} />
      {article && <Hero />}
      {article && <Filter />}
      {article && <Cards loading={loading} />}
    </div>
  );
}
