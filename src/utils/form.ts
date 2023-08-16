
// export type HaFormSchema =
//     | HaFormConstantSchema
//     | HaFormStringSchema
//     | HaFormIntegerSchema
//     | HaFormFloatSchema
//     | HaFormBooleanSchema
//     | HaFormSelectSchema
//     | HaFormMultiSelectSchema
//     // | HaFormTimeSchema
//     | HaFormSelector;
//     // | HaFormGridSchema;

// export interface HaFormBaseSchema {
//   name: string;
//   // This value is applied if no data is submitted for this field
//   default?: HaFormData;
//   required?: boolean;
//   context?: Record<string, string>;
// }

// export interface HaFormConstantSchema extends HaFormBaseSchema {
//     type: "constant";
//     value?: string;
// }

// export interface HaFormIntegerSchema extends HaFormBaseSchema {
//     type: "integer";
//     default?: HaFormIntegerData;
//     valueMin?: number;
//     valueMax?: number;
// }

// export interface HaFormSelectSchema extends HaFormBaseSchema {
//   type: "select";
//   options: Array<[string, string]>;
// }

// export interface HaFormMultiSelectSchema extends HaFormBaseSchema {
//   type: "multi_select";
//   options: Record<string, string> | string[] | Array<[string, string]>;
// }

// export interface HaFormFloatSchema extends HaFormBaseSchema {
//   type: "float";
// }

// export interface HaFormStringSchema extends HaFormBaseSchema {
//   type: "string";
//   format?: string;
// }

// export interface HaFormBooleanSchema extends HaFormBaseSchema {
//   type: "boolean";
// }

// export interface HaFormSelector extends HaFormBaseSchema {
//   type?: never;
//   selector: Selector;
// }

// export type HaFormData =
//     | HaFormStringData
//     | HaFormIntegerData
//     | HaFormFloatData
//     | HaFormBooleanData
//     | HaFormSelectData
//     | HaFormMultiSelectData

// export type HaFormStringData = string;
// export type HaFormIntegerData = number;
// export type HaFormFloatData = number;
// export type HaFormBooleanData = boolean;
// export type HaFormSelectData = string;
// export type HaFormMultiSelectData = string[];
