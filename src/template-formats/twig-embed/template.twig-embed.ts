import { TemplateInput, emptyTemplate } from "../../index";
import {
  TemplateAttribute,
  simpleUniqueKey,
  OnElement,
  OnCloseElement,
  OnVariable,
  OnText,
  OnSerialize,
  EnumOption
} from "../../common";

export default class TwigEmbed {
  static id = "twig-embed";
  public dirname = "twig-embed";
  static isDefaultOption = false;

  data: string = "";
  template: TemplateInput;
  assignedDynamicKeys: string[];

  constructor(template: TemplateInput = emptyTemplate) {
    this.template = template;
    this.data = "";
    this.assignedDynamicKeys = [];
  }

  wrapVar = (key: string): string => {
    return `{$${key}}`;
  };

  ifVar = (
    needsPrecedingSpace: boolean,
    key: string,
    children: string,
    attribute: TemplateAttribute
  ): string => {
    return `<% if $${key} %>${needsPrecedingSpace ? " " : ""}${children ||
      attribute.key}<% end_if %>`;
  };

  renderAttribute = (attribute: TemplateAttribute, id: string): string => {
    // TODO: escape attribute values and keys?

    let attr = "";
    if (attribute.isOmittedIfEmpty) {
      attr += `<% if ${attribute.dynamicKeys
        .map(dynamicKey => `$${dynamicKey.key}`)
        .join(" && ")} %>`;
    }
    attr += ` ${attribute.key}="${attribute.value}`;

    let hasPrecedingValue = attribute.value.length > 0;

    if (attribute.dynamicKeys) {
      attr += attribute.dynamicKeys
        .map((dynamicKey, i) => {
          if (i >= 1) {
            hasPrecedingValue = true;
          }
          switch (dynamicKey.type) {
            case "boolean": {
              return this.ifVar(
                !!attribute.value || attribute.dynamicKeys.length > 1,
                dynamicKey.key,
                (hasPrecedingValue ? " " : "") + dynamicKey.ifTrueValue,
                attribute
              );
              break;
            }
            case "string": {
              return (
                (hasPrecedingValue ? " " : "") + this.wrapVar(dynamicKey.key)
              );
              break;
            }
            default: {
              if (Array.isArray(dynamicKey.type)) {
                return (
                  (dynamicKey.type as EnumOption[])
                    .map((enumOption, i) => {
                      let response = "";
                      if (i === 0) {
                        response += "<% if ";
                      } else {
                        response += "<% else_if ";
                      }
                      response += `$${dynamicKey.key} == "${
                        enumOption.name
                      }" %>${hasPrecedingValue ? " " : ""}${enumOption.value}`;
                      return response;
                    })
                    .join("") + "<% end_if %>"
                );
              }
              break;
            }
          }
        })
        .join("")
        .trim();
    } else {
      attr += attribute.value;
    }
    attr += `"`;
    if (attribute.isOmittedIfEmpty) {
      attr += "<% end_if %>";
    }
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
      "> ";
    return tagName;
  };

  onCloseElement = async ({ tagName }: OnCloseElement): Promise<void> => {
    this.data += `</${tagName}> `; // DEV NOTE: trailing whitespace to help Prettier linewrap
  };

  onText = async ({ text }: OnText): Promise<void> => {
    this.data += text;
  };

  onVariable = async ({ key }: OnVariable): Promise<void> => {
    this.data += this.wrapVar(key) + "\n";
  };

  serialize = async ({ css }: OnSerialize): Promise<Object> => {
    const extname = "twig";

    const files = {
      [`${this.dirname}/${this.template.id}.${extname}`]: this.data.trim()
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
