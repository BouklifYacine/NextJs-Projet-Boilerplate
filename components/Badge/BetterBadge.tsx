"use client";

import { Announcement, AnnouncementTitle } from "@/components/ui/announcement";

interface Props {
  texte: number | string;
  icon?: React.ReactNode;
  classname?: string;
}

const BetterBadge = ({ texte, icon, classname }: Props) => (
  <>
    <Announcement>
      <AnnouncementTitle className={classname}>
        {texte}
        {icon}
      </AnnouncementTitle>
    </Announcement>
  </>
);

export { BetterBadge };
