import { LovelaceCardEditor, fireEvent } from "custom-card-helpers";
import { LitElement, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { VehicleCardConfig } from "./vehicle-card-config";
import { BaseElement } from "../base-element";
import { HaFormSchema } from "../../utils/form/ha-form";
import "../../utils/form/custom/ha-form-list"
// import { HaFormSchema } from "../../utils/form";

export const VEHICLE_CARD_EDITOR_NAME = "vehicle-card-editor";

type DeviceEntry = {
  id: string,
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string | null;
  model: string | null;
  name: string | null;
  sw_version: string | null;
  hw_version: string | null;
  via_device_id: string | null;
  area_id: string | null;
  name_by_user: string | null;
  entry_type: "service" | null;
  disabled_by: "user" | "integration" | "config_entry" | null;
  configuration_url: string | null;
}


const schema: HaFormSchema[] = [
  {
    name: "preset",
    required: false,
    selector: {
      select: { mode: "dropdown", options: ['Skoda Enyaq'], }
    }
  },
  { 
    name: "static_elements",
    selector: {
      vehicle_elements: []
    } 
  },

  {
    type: "list-element",
    name: "lets-see",
    schema: [
      { name: "sensor", selector: { entity: { domain: "binary_sensor" } }},
      { name: "image_on", selector: { text: { } }}
      { name: "image_off", selector: { text: { } }}
    ]
  },
  // {
  //   type: "grid",
  //   name: "",
  //   schema: [
  //     { name: "hmm", selector: { select: { mode: "dropdown", options: ['Skoda Enyaq'], } }},
  //     { name: "hmm1", selector: { select: { mode: "dropdown", options: ['Skoda Enyaq'], } }}
  //   ]
  // }
]

const staticLabels: { [key: string]: { label: string } } = {
  "preset": { label: "Preset" },
  "device": { label: "Device" },
  "hmm": { label: "Hmm" },
};

@customElement(VEHICLE_CARD_EDITOR_NAME)
export class VehicleCardEditor extends BaseElement implements LovelaceCardEditor {
  @state() private _config?: VehicleCardConfig;

  public setConfig(config: VehicleCardConfig): void {
    this._config = { ...config };
  }

  public static getStubConfig() {
    return {};
  }

  public getCardSize() {
    return 1;
  }

  protected async updated(changedProperties: Map<string, any>) {
    console.log(changedProperties);
    if (!this.hass || !this._config) {
      return;
    }

    // console.log(changedProperties);

    let devices = await this.hass.callWS<DeviceEntry[]>({
      type: "config/device_registry/list",
    }).then((devices: DeviceEntry[]) => {
      return devices.filter((device: DeviceEntry) => {
        return device.id === this._config?.device;
      });
    });

    // console.log(devices);

  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }
    // const dr: DeviceRegistry = 

    // const schema = computeSchema(this.hass!.localize);

    return html`
          <ha-form
              .hass=${this.hass}
              .data=${this._config}
              .schema=${schema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._valueChanged}
          ></ha-form>
      `;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (schema.name in staticLabels) {
      return staticLabels[schema.name].label;
    } else {
      return schema.name
    }
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}
