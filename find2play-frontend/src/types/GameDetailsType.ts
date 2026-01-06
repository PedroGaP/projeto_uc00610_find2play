import type { GameType } from "./GameType";

export default interface GameDetailsType extends GameType {
  description: string;
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: { id: number; image: string }[];
  status: string;
}
