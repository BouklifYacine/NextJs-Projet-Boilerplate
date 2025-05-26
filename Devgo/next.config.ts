import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com', 'lh3.googleusercontent.com', "sportal.fr", "icdn.empireofthekop.com","i.eurosport.com","cdn.vox-cdn.com","yop.l-frii.com","assets.goal.com"],
  },
};

export default nextConfig;
