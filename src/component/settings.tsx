import { useEffect, useState } from "react";
import { useTheme } from "../context/themecontext";

function Settings() {

const [ name,setName ]= useState(()=>{
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile).name : "Alex Morgan";
});
const [email,setEmail] = useState(()=> {
    const savedProfile = localStorage.getItem("userProfile"); 
    return savedProfile ? JSON.parse(savedProfile).email : "alex@example.com";
});
const [role, setRole]= useState(()=> {
    const savedProfile = localStorage.getItem("userProfile"); 
    return savedProfile ? JSON.parse(savedProfile).role : "Frontend Developer";
});
const [isEditing, setIsEditing] = useState(false);
const [emailNotifications, setEmailNotifications] = useState(()=>{ 
    const saved = localStorage.getItem("emailNotifications");
    return saved !== null ? JSON.parse(saved) : true;
});
const [compactMode, setCompactMode]= useState(()=>{ 
    const saved = localStorage.getItem("compactMode");
    return saved !== null ? JSON.parse(saved) : false;
});
const [ showPasswordform ,setShowpasswordform ]= useState(false);
const [ currentpassword, setCurrentpassword] = useState("");
const [newpassword, setNewpassword]= useState("");
const [confirmpassword, setConfirmpassword]= useState("");

const { theme,toggleTheme }= useTheme();


function handleSaveProfile() {
  const profile = { name, email, role };

  localStorage.setItem("userProfile", JSON.stringify(profile));

  setIsEditing(false);
}

useEffect(()=>{
    localStorage.setItem("emailNotifications", JSON.stringify(emailNotifications));
},[emailNotifications]);
useEffect(()=>{
    localStorage.setItem("compactMode",  JSON.stringify(compactMode));
},[compactMode]);

function handlePasswordChange() {
  if (!currentpassword || !newpassword || !confirmpassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (newpassword.length < 8) {
    alert("New password must be at least 8 characters long.");
    return;
  }

  if (newpassword !== confirmpassword) {
    alert("New passwords do not match.");
    return;
  }

  alert("Password validation successful!");

  setCurrentpassword("");
  setNewpassword("");
  setConfirmpassword("");
  setShowpasswordform(false);
}
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="mt-1 text-slate-500">Manage your account and application preferences.</p>
      </div>

     {/* Profile Settings */}
<div className="rounded-xl bg-white p-6 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-slate-800">Profile Settings</h3>
      <p className="mt-1 text-sm text-slate-500">Manage your personal information.</p>
    </div>

    <button onClick={() => { if (isEditing) {
    handleSaveProfile();
     } else {
    setIsEditing(true);
  }
}}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
      {isEditing ? "Save Changes" : "Edit Profile"}
    </button>
  </div>

  <div className="mt-6 space-y-4">
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">Full Name</label>
      <input type="text" value={name} disabled={!isEditing}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-4 py-2 disabled:bg-slate-50"/>
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">Email Address</label>
      <input type="email" value={email} disabled={!isEditing}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-4 py-2 disabled:bg-slate-50"/>
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">Role</label>
      <input type="text" value={role} disabled={!isEditing}
        onChange={(e) => setRole(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-4 py-2 disabled:bg-slate-50"/>
    </div>
  </div>
</div>

      {/* Application Preferences */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">Application Preferences</h3>
        <p className="mt-1 text-sm text-slate-500">Customize your application experience.</p>
        <div className="space-y-5">
      {/* Email Notifications */}
      <div className="flex items-center justify-between">
      <div>
         <h3 className="font-medium text-gray-800">Email Notifications</h3>
      <p className="text-sm text-gray-500">Receive updates about your projects and tasks.</p>
    </div>

    <input type="checkbox" checked={emailNotifications}
      onChange={(e) => setEmailNotifications(e.target.checked)}
      className="h-5 w-5 cursor-pointer accent-blue-600"/>
  </div>

  {/* Compact Mode */}
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-medium text-gray-800">Compact Mode</h3>
      <p className="text-sm text-gray-500">Use a more compact layout.</p>
    </div>

    <input type="checkbox" checked={compactMode}
      onChange={(e) => setCompactMode(e.target.checked)}
      className="h-5 w-5 cursor-pointer accent-blue-600"/>
   </div>
   <div className="flex items-center justify-between">
  <div>
    <h3 className="font-medium text-gray-800">Appearance</h3>
    <p className="text-sm text-gray-500">Switch between light and dark mode.</p>
  </div>
  <button onClick={toggleTheme} className="rounded-lg bg-gray-800 px-4 py-2 text-white">
    {theme==="light" ? "Dark Mode":"Light Mode"}
  </button>
</div>
</div>
      </div>


      {/* Account Settings */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">Account Settings</h3>
        <p className="mt-1 text-sm text-slate-500">Manage your account preferences.</p>
      </div>
      <div className="mt-4">
  <button
    onClick={() => setShowpasswordform(!showPasswordform)}
    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
    {showPasswordform ? "Cancel" : "Change Password"}
  </button>

  {showPasswordform && (
    <div className="mt-5 space-y-4">
      <input type="password" placeholder="Current Password" value={currentpassword}
        onChange={(e) => setCurrentpassword(e.target.value)}
        className="w-full rounded-lg border p-3"/>

      <input type="password" placeholder="New Password" value={newpassword}
        onChange={(e) => setNewpassword(e.target.value)}
        className="w-full rounded-lg border p-3"/>

      <input type="password" placeholder="Confirm New Password" value={confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        className="w-full rounded-lg border p-3"/>
         
      <button onClick={handlePasswordChange}
      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
     Update Password</button>
    </div>
     )}
   </div>
    </div>
  );
}

export default Settings;