import { HomeAssistant } from "custom-card-helpers";
import { LitElement } from "lit";
import { property } from "lit/decorators.js";

export class BaseElement extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
}
