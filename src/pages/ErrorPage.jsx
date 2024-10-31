// img
import imageNotFound from "../../public/404-not-found.webp";

// rrd
import { useNavigate } from "react-router-dom";

// flowbite
import { Button } from "flowbite-react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full">
      <img
        className="relative h-screen w-screen"
        src={imageNotFound}
        alt="DALL·E 2024-10-28 12.15.40 - A simple yet serious 404 error page illustration. The scene shows a vast desert landscape under a calm, light-blue sky with sparse clouds. In the cent"
      />
      <Button
        onClick={() => navigate("/")}
        color="dark"
        className="absolute bottom-[27%] left-[46.5%] z-10"
      >
        Go home
      </Button>
    </div>
  );
}
