import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>; 
  }

  return (
    <main>
      <Outlet /> 
    </main>
  );
}