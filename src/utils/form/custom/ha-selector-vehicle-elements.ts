import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/alignment-picker";
import { fireEvent, HomeAssistant } from "custom-card-helpers";

export type VehicleElementsSelector = {
  vehicle_elements: [];
};

@customElement("ha-selector-vehicle-elements")
export class HaVehicleElementsSelector extends LitElement {
  @property() public hass!: HomeAssistant;

  @property() public selector!: VehicleElementsSelector;

  @property() public value?: string;

  @property() public label?: string;

  protected render() {
    return html`
      <div class="vehicle-elements">
        <h3>${this.label}</h3>
        <div class="vehicle-elements__container">
        <mwc-list-item .value="well">
            Well well
        </mwc-list-item>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
  }
}
