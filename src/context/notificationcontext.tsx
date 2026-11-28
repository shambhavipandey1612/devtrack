import { createContext, useContext, useEffect, useState, type ReactNode,} from "react";

export type Notification = {
  id: number;
  message: string;
  read: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
};

export const NotificationContext =createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("notifications");

    return saved ? JSON.parse(saved) : [
      { id: 1, message: "Welcome to DevTrack!", read: false },
      { id: 2, message: "Your dashboard is ready.", read: false },
      { id: 3, message: "Explore your projects and tasks.", read: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  function addNotification(message: string) {
    setNotifications((previous) => [
      {
        id: Date.now(),
        message,
        read: false,
      },
      ...previous,
    ]);
  }

  function markAsRead(id: number) {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
}