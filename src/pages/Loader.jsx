import Loading from "../components/atoms/Loading";
import { usePageTransition } from "../hooks/usePageTransition";

const LoaderPage = () => {
  const loading = usePageTransition(300);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default LoaderPage;
