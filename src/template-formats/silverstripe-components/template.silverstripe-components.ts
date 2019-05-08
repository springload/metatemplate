import {
  TemplateInput,
  emptyTemplate,
  TemplateUsages,
  TemplatesById,
  FormatUsageResponse,
  FormatUsageOptions
} from "../../index";
import Mustache from "../mustache/template.mustache";
import ReactTsStyledComponents from "../react-ts-styled-components/template.react-ts-styled-components";

export default class SilverStripe extends Mustache {
  static id = "silverstripe-components";
  public dirname = "silverstripe-components";
  static isDefaultOption = true;

  constructor(template: TemplateInput = emptyTemplate) {
    super(template, {
      format: "silverstripe"
    });
  }

  makeUsage = async (
    code: TemplateUsages,
    templates: TemplatesById,
    options?: FormatUsageOptions | undefined
  ): Promise<FormatUsageResponse> => {
    const importPrefix =
      (options && options.importPrefix) || "@govtnz/ds/build/"; // TODO: Refactor this out so it's always config

    // In ReactTsStyledComponents it uses Prettier, but Prettier doesn't
    // understand regular Silverstripe templates, and it doesn't
    // understand 'SilverStripe Components' syntax either,
    // but the later is similar to React with different tag syntax, so we'll
    // now replace it.

    const comp = new ReactTsStyledComponents(emptyTemplate, {
      language: "component-and-imports",
      css: "none"
    });
    const usageResponse = await comp.makeUsage(code, templates, {
      flattenAttributeValues: true
    });
    let usageCode = usageResponse.code;

    // Using 'SilverStripe Components' syntax see https://github.com/symbiote/silverstripe-components/
    usageCode = usageCode.replace(/<[^ >]+/gi, match => {
      if (!match.match(/[A-Z]/)) {
        // if it's just HTML with lowercase tags
        return match;
      }
      if (match.startsWith("</")) {
        return `</:` + match.substring(2);
      }
      return `<:` + match.substring(1);
    });

    const cssReferences =
      usageResponse &&
      usageResponse.imports
        .map(item => {
          const shouldNotHaveStyleFile = item === "React";
          return shouldNotHaveStyleFile ? "" : `${item}.css`;
        })
        .join(", ");

    const scssReferences =
      usageResponse &&
      usageResponse.imports
        .map(item => {
          const shouldNotHaveStyleFile = item === "React";
          return shouldNotHaveStyleFile ? "" : `${item}.scss`;
        })
        .join(", ");

    const styleReferences = `<%--\nRemember to add these styles:\n${
      cssReferences ? `in CSS: ${cssReferences}\n` : ""
    }${scssReferences ? `OR in Sass (SCSS): ${scssReferences}\n` : ""}--%>`;

    usageCode = `${styleReferences}${styleReferences ? "\n" : ""}${usageCode}`;

    return { code: usageCode };
  };
}
