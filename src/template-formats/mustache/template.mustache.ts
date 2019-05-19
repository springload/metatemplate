import { TemplateInput, emptyTemplate } from "../../index";
import {
  TemplateAttribute,
  simpleUniqueKey,
  OnElement,
  OnCloseElement,
  OnVariable,
  OnText,
  OnSerialize
} from "../../common";

export default class Mustache {
  static id = "mustache";
  public dirname = "mustache";
  static isDefaultOption = true;

  data: string = "";
  template: TemplateInput;
  assignedDynamicKeys: string[];
  unescapedKeys: string[];

  constructor(template: TemplateInput = emptyTemplate) {
    this.template = template;
    this.data = "";
    this.assignedDynamicKeys = [];
    this.unescapedKeys = [];
  }

  wrapVar = (key: string): string => {
    return `{{${key}}}`;
  };

  ifVar = (
    needsPrecedingSpace: boolean,
    key: string,
    children: string,
    attribute: TemplateAttribute
  ): string => {
    return `{{#${key}}}${needsPrecedingSpace ? " " : ""}${children ||
      attribute.key}{{/${key}}}`;
  };

  renderAttribute = (attribute: TemplateAttribute, id: string): string => {
    // TODO: escape attribute values and keys?
    let attr = ` ${attribute.key}="${attribute.value}`;

    if (attribute.dynamicKeys) {
      attr += (
        " " +
        attribute.dynamicKeys
          .map(dynamicKey => {
            switch (dynamicKey.type) {
              case "boolean": {
                return this.ifVar(
                  !!attribute.value || attribute.dynamicKeys.length > 1,
                  dynamicKey.key,
                  dynamicKey.ifTrueValue,
                  attribute
                );
                break;
              }
              case "string": {
                return this.wrapVar(dynamicKey.key);
                break;
              }
              default: {
                if (Array.isArray(dynamicKey.type)) {
                  // Unfortunately we just have to return the {{key}} so...
                  return this.wrapVar(dynamicKey.key);
                  // This is because we can't map EnumOptions into an if/else
                  // in Mustache because it lacks comparisons. There's no way
                  // to do this (in pseudocode)
                  //
                  // if key === enum1
                  //   some_value
                  // endif
                  // if key === enum2
                  //   some_value
                  // endif
                  //
                  // because Mustache templates are logicless, that's the whole
                  // concept of the thing, so we can only write templates like,
                  //
                  // if isKeyWasEnum1
                  //    some_value
                  // endif
                  // if isKeyWasEnum2
                  //    some_value
                  // endif
                  //
                  // So the logic needs to be computed outside the template, which
                  // we can't do (Mustache might be run from many languages).
                  //
                  // Perhaps we should convert every individual option to an isEnum
                  // boolean, but that would be gross to look at.
                  //
                  // Sadly, it seems simpler to just set the value as a string.
                }

                break;
              }
            }
          })
          .join(" ")
      ).trim();
    } else {
      attr += attribute.value;
    }
    attr += `"`;
    return attr;
  };

  onElement = async ({
    tagName,
    attributes,
    isSelfClosing
  }: OnElement): Promise<string> => {
    this.data +=
      `<${tagName}` + // TODO: escape elementName?
      (attributes
        ? attributes
            .map((attribute: TemplateAttribute) => {
              return this.renderAttribute(attribute, this.template.id);
            })
            .join("")
        : "") +
      (isSelfClosing ? "/" : "") +
      "> "; // DEV NOTE: trailing whitespace to help Prettier linewrap
    return tagName;
  };

  onCloseElement = async ({ tagName }: OnCloseElement): Promise<void> => {
    this.data += `</${tagName}> `; // DEV NOTE: trailing whitespace to help Prettier linewrap
  };

  onText = async ({ text }: OnText): Promise<void> => {
    this.data += text;
  };

  onVariable = async ({ key }: OnVariable): Promise<void> => {
    this.unescapedKeys.push(key);
    this.data += `{{{${key}}}}`;
  };

  mustacheWarning = (): string => {
    return `{{! DEVELOPER NOTE: This template uses triple-bracket "{{{"\n    which disables HTML escaping.\n    Please ensure these variables are properly escaped:\n     - ${this.unescapedKeys.join(
      ",\n     - "
    )}.\n    The reason for this is to allow raw HTML, for values such as (eg) '<span lang="mi">Māori</span>'. }}\n\n`;
  };

  serialize = async ({ css }: OnSerialize): Promise<Object> => {
    const cssFilename = `css/${this.template.id}.css`;
    const warning = this.unescapedKeys.length ? this.mustacheWarning() : "";
    const extname = "mustache";
    const files = {
      [`${this.dirname}/${this.template.id}.${extname}`]: `${warning}${
        this.data
      }`.trim()
    };

    return files;
  };

  registerDynamicKey = (key: string): string => {
    return simpleUniqueKey(key, this.assignedDynamicKeys);
  };

  getAssignedDynamicKeys = (): string[] => {
    return this.assignedDynamicKeys;
  };

  generateIndex = (filesArr: string[]): Object => {
    return {};
  };
}
