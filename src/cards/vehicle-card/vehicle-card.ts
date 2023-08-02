import { LovelaceCard, LovelaceCardEditor } from "custom-card-helpers";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { registerCustomCard } from "../../utils/register-card";
import { VEHICLE_CARD_EDITOR_NAME } from "./vehicle-card-editor";
import { VehicleCardConfig } from "./vehicle-card-config";
import { BaseElement } from "../base-element";

const VEHICLE_CARD_NAME = "vehicle-card";

registerCustomCard(VEHICLE_CARD_NAME, "Vehicle Card", "Card which shows a vehicle status");

@customElement(VEHICLE_CARD_NAME)
export class VehicleCard extends BaseElement implements LovelaceCard {

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./vehicle-card-editor");
    return document.createElement(VEHICLE_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig() {
    return {};
  }

  @state() private _config?: VehicleCardConfig;

  getCardSize(): number | Promise<number> {
    return 4;
  }

  setConfig(config: VehicleCardConfig): void {
    this._config = config;
    this.loadComponents();
}

async loadComponents() {
  if (!this._config || !this.hass || !this._config.entity) return;
  const entityId = this._config.entity;
  // const stateObj = this.hass.states[entityId] as HassEntity | undefined;

  // if (stateObj && hasCode(stateObj)) {
  //     void import("../../shared/form/mushroom-textfield");
  // }
}

  protected render() {

    const vehicleImage = process.env.ASSET_URL + "/enyaq/body.png";

    return html`
      <ha-card header="Vehicle-card">
        <hui-image .hass=${this.hass} .image=${vehicleImage}></hui-image>
        <hui-picture-elements-card
          .hass=${this.hass}
          .image=${vehicleImage}
          .elements=${[]}
          ></hui-picture-elements-card>
      </ha-card>
    `;
  }
}
