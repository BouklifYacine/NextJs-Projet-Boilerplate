'use client';

import {
  Announcement,
  AnnouncementTitle,
} from '@/components/ui/announcement';
import { ArrowUpRightIcon } from 'lucide-react';

const BadgeTexteIcone = () => (
  <div className="flex w-full h-screen items-center justify-center gap-4">
    <Announcement>
      <AnnouncementTitle>
        New feature added
        <ArrowUpRightIcon size={16} className="shrink-0 text-muted-foreground" />
      </AnnouncementTitle>
    </Announcement>
  </div>
);

export { BadgeTexteIcone };