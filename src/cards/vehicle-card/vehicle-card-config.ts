import { LovelaceCardConfig } from "custom-card-helpers";

export type VehicleCardConfig = LovelaceCardConfig & {
  model: string,
  device: string,
  name?: string,
};
