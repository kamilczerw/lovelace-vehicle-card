import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { HaFormListSchema, HaFormSchema } from "../ha-form";

export type FormList = {
  elements: [];
};

const SCHEMA = {
  name: "preset",
  required: false,
  selector: {
    select: { mode: "dropdown", options: ['Skoda Enyaq'], }
  }
};

@customElement("ha-form-list-element")
export class HaFormList extends LitElement {
  @property() public hass!: HomeAssistant;

  // @property() public selector!: FormList;

  @property() public schema!: HaFormListSchema;

  @property() public value?: string;

  @property() protected data?: any;

  @property() public label?: string;

  protected render() {
    console.log(this.schema)
    return html`
      <div class="elements">
        <h3>${this.label}</h3>
        <div class="elements__container">
        <ha-form
            .hass=${this.hass}
            .data=${this.data}
            .schema=${this.schema.schema}
            @value-changed=${this._valueChanged}
        ></ha-form>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
  }
}
