
import { Search, Bell, UserRound ,User ,Settings,LogOut,} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";


type Notification={
  id:number;
  message: string;
  read : boolean;
};

function Topbar() {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

const [notifications, setNotifications] = useState<Notification[]>(() =>{
  const savedNotifications = localStorage.getItem("notifications");
  return savedNotifications ?JSON.parse(savedNotifications):[
  { id: 1, message: "Welcome to DevTrack!", read: false },
  { id: 2, message: "Your dashboard is ready.", read: false },
  { id: 3, message: "Explore your projects and tasks.", read: true },
];
});
useEffect(()=>{
  localStorage.setItem("notifcations",JSON.stringify(notifications));
},[notifications]);

const unreadCount = notifications.filter((notification)=>!notification.read).length;
function markAsRead(id:number) {
  setNotifications((previous)=>previous.map((notification)=>
  notification.id===id?{...notification,read:true}
   :notification));
}
function markAllAsRead() {
  setNotifications((previous)=>previous.map((notification)=> ({
    ...notification,read:true
  }))
);
}


  const profileRef= useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState(() => {
  const savedProfile = localStorage.getItem("userProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "Alex Morgan",
        email: "alex@example.com",
        role: "Frontend Developer",
      };
});
useEffect(()=>{
  function updateProfile() {
    const savedProfile= localStorage.getItem("userProfile");
    if(savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }
  window.addEventListener("storage",updateProfile);
  window.addEventListener("profileUpdated",updateProfile);
  return () =>{
    window.removeEventListener("storage",updateProfile);
     window.removeEventListener("profileUpdated",updateProfile);
  };
},[]);
useEffect(() => {
  function handleOutsideClick(event:MouseEvent){
    if(profileRef.current && !profileRef.current.contains(event.target as Node)){
        setIsProfileOpen(false);
      }
  }
  document.addEventListener("mousedown",handleOutsideClick);
  return()=>{
    document.removeEventListener("mousedown",handleOutsideClick);
  };
},[]);
useEffect(() =>{
  function handleEscape(event:KeyboardEvent){
    if(event.key==="Escape"){
      setIsProfileOpen(false);
    }
  }
  document.addEventListener("keydown",handleEscape);
  return () => {
    document.removeEventListener("keydown",handleEscape);
  };
},[]);

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/mytasks": "My Tasks",
    "/team": "Team",
    "/settings": "Settings",
    "/kanban": "Kanban Board",
  };

  const pageTitle = pageTitles[location.pathname] || "DevTrack";

  return (
    <header className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-4 sm:px-6 
    dark:border-gray-700 dark:bg-gray-800">

      {/* Page title */}
      <h1 className="ml-12 truncate text-lg font-bold text-slate-800 sm:ml-0 sm:text-2xl dark:text-white">
        {pageTitle}
      </h1>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-5">

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-2 sm:px-3 dark:bg-gray-700">
          <Search size={18} className="shrink-0 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="w-16 bg-transparent text-xs outline-none sm:w-36 sm:text-sm dark:text-white dark:placeholder-gray-300"
          />
        </div>

        {/* Notification */}
        <button onClick={()=>{
          setIsNotificationsOpen(!isNotificationsOpen);
          setIsProfileOpen(false);
        }}
        className="relative text-slate-600 hover:text-indigo-600 dark:text-gray-300">
          <Bell size={20} />
          {unreadCount >0 && (
            <span className="absolute -right-2-top-2 flex h-5 w-5 items-center justify-center 
            rounded-full bg-red-500 text-xs text-white">{unreadCount}</span>
          )}
        </button>

        {isNotificationsOpen && (
  <div className="absolute right-16 top-16 z-50 w-72 rounded-lg border border-slate-200 bg-white p-3 
  shadow-lg dark:border-gray-700 dark:bg-gray-800">

    <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-gray-700">
      <h3 className="font-semibold text-slate-800 dark:text-white">
        Notifications
      </h3>

      <button onClick={markAllAsRead}
        className="text-xs text-indigo-600 hover:underline dark:text-indigo-400">
        Mark all as read
      </button>
    </div>

    <div className="mt-2 space-y-2">
      {notifications.map((notification) => (
        <button key={notification.id}
          onClick={() => markAsRead(notification.id)}
          className={`w-full rounded-md p-3 text-left text-sm ${
            notification.read
              ? "bg-white text-slate-500 dark:bg-gray-800 dark:text-gray-400"
              : "bg-indigo-50 text-slate-800 dark:bg-gray-700 dark:text-white"
          }`}>
          {notification.message}

          {!notification.read && (
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-indigo-600" />
          )}
        </button>
      ))}
    </div>

  </div>
)}

        {/* Profile */}
        <div className="relative" ref={profileRef}>
        
        <button  onClick={() => setIsProfileOpen(!isProfileOpen)}
         className="flex items-center justify-center rounded-full bg-indigo-100 p-2 text-indigo-700
         hover:bg-indigo-200"><UserRound size={20} />
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-slate-200 bg-white p-2 
          shadow-lg dark:border-gray-700 dark:bg-gray-800">
         <div className="px-3 py-2">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{profile.name}</p>

  <p className="truncate text-xs text-slate-500 dark:text-gray-400">
    {profile.email}
  </p>

  <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
    {profile.role}
  </p>
</div>   
        <div className="my-1 border-t border-slate-200 dark:border-gray-700" />

      <button onClick={() => {
          window.location.href = "/settings";
          setIsProfileOpen(false);
        }}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-gray-200 
        dark:hover:bg-gray-700">
        <User size={16} className="mr-2 inline"/>
        My Profile
      </button>

      <button onClick={() => {
          window.location.href = "/settings";
          setIsProfileOpen(false);
        }}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-gray-200 
        dark:hover:bg-gray-700">
          <Settings size={16} className="mr-2 inline"/>
        Settings
      </button>

      <div className="my-1 border-t border-slate-200 dark:border-gray-700" />

      <button onClick={() => setIsProfileOpen(false)}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700">
          <LogOut size={16} className="mr-2 inline"/>
        Logout (Demo)
      </button>
    </div>
        
        )}
        </div>

      </div>
    </header>
  );
}

export default Topbar;

