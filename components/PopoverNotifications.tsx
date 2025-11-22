"use client";

import { useState } from "react";
import { BellIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type NotificationItem = {
  id: number | string;
  image?: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  unread: boolean;
};

interface PopoverNotificationsProps {
  notifications: NotificationItem[];
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (id: number | string) => void;
  title?: string;
}

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function PopoverNotifications({
  notifications: initialNotifications,
  onMarkAllAsRead,
  onNotificationClick,
  title = "Notifications",
}: PopoverNotificationsProps) {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
    onMarkAllAsRead?.();
  };

  const handleNotificationClick = (id: number | string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
    onNotificationClick?.(id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">{title}</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-1 my-1 h-px bg-border"
        ></div>
        {notifications.length === 0 ? (
          <div className="px-3 py-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <div className="relative flex items-start gap-3 pe-3">
                {notification.image && (
                  <img
                    className="size-9 rounded-md"
                    src={notification.image}
                    width={32}
                    height={32}
                    alt={notification.user}
                  />
                )}
                <div className="flex-1 space-y-1">
                  <button
                    className="text-left text-foreground/80 after:absolute after:inset-0"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <span className="font-medium text-foreground hover:underline">
                      {notification.user}
                    </span>{" "}
                    {notification.action}{" "}
                    <span className="font-medium text-foreground hover:underline">
                      {notification.target}
                    </span>
                    .
                  </button>
                  <div className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </div>
                </div>
                {notification.unread && (
                  <div className="absolute end-0 self-center">
                    <Dot />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
