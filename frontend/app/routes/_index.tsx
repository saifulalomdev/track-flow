import { useUser } from "@clerk/clerk-react";

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>;

  // Handle logged out state
  if (!isSignedIn) return null;

  return (
    <div className="flex items-center gap-4">
      {/* Profile Picture */}
      <img 
        src={user.imageUrl} 
        alt="Profile" 
        className="w-10 h-10 rounded-full" 
      />

      <div>
        {/* Full Name */}
        <p className="font-bold">{user.fullName}</p>
        
        {/* Primary Email Address */}
        <p className="text-sm text-gray-500">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>
  );
}