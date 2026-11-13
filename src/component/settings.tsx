
import { useEffect, useState } from "react";
import { useTheme } from "../context/themecontext";

function Settings() {
  const [name, setName] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile).name : "Alex Morgan";
  });

  const [email, setEmail] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile).email : "alex@example.com";
  });

  const [role, setRole] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile).role : "Frontend Developer";
  });

  const [isEditing, setIsEditing] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem("emailNotifications");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [compactMode, setCompactMode] = useState(() => {
    const saved = localStorage.getItem("compactMode");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme, toggleTheme } = useTheme();

  function handleSaveProfile() {
    const profile = { name, email, role };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  }

  useEffect(() => {
    localStorage.setItem("emailNotifications", JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem("compactMode", JSON.stringify(compactMode));
  }, [compactMode]);

  function handlePasswordChange() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    alert("Password validation successful!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Settings
        </h2>
        <p className="mt-1 text-slate-500 dark:text-gray-300">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Profile Settings
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
              Manage your personal information.
            </p>
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleSaveProfile();
              } else {
                setIsEditing(true);
              }
            }}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 disabled:bg-slate-50"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 disabled:bg-slate-50"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-gray-300">
              Role
            </label>
            <input
              type="text"
              value={role}
              disabled={!isEditing}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 disabled:bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Application Preferences */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Application Preferences
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
          Customize your application experience.
        </p>

        <div className="mt-5 space-y-5">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Receive updates about your projects and tasks.
              </p>
            </div>

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-blue-600"
            />
          </div>

          {/* Compact Mode */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">
                Compact Mode
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Use a more compact layout.
              </p>
            </div>

            <input
              type="checkbox"
              checked={compactMode}
              onChange={(e) => setCompactMode(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-blue-600"
            />
          </div>

          {/* Appearance */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">
                Appearance
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Switch between light and dark mode.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Account Settings
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
          Manage your account preferences.
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>

          {showPasswordForm && (
            <div className="mt-5 max-w-md space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border p-3"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border p-3"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border p-3"
              />

              <button
                onClick={handlePasswordChange}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
