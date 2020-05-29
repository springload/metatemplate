import {
  makeTemplates,
  makeIndexImports,
  makeUsage,
  CSSVariablePattern,
  TemplateUsages,
  jsxToUsageCode,
} from "../index";

export const testFormat = (formatId: string) => {
  describe("Snapshots", () => {
    // it("makeIndexImports", () => {
    //   const files = { "react-ts/blah.js": 'console.log("html5zombo.com");' };
    //   const result = makeIndexImports({ fileKeys: Object.keys(files) });
    //   expect(result).toMatchSnapshot();
    // });

    // it(`${formatId}: Basic variables`, async () => {
    //   const metaTemplate = await makeTemplates(
    //     {
    //       html:
    //         '<p><mt-variable key="children">Some placeholder text</mt-variable></p>',
    //       css: "",
    //       id: "paragraph",
    //     },
    //     [formatId]
    //   );
    //   expect(metaTemplate).toMatchSnapshot();
    // });

    // it(`${formatId}: form input[text]`, async () => {
    //   const metaTemplate = await makeTemplates(
    //     {
    //       html:
    //         '<label for="textId">Label text</label><input id="textId" type="text">',
    //       css: "",
    //       id: "input",
    //     },
    //     [formatId]
    //   );
    //   expect(metaTemplate).toMatchSnapshot();
    // });

    // it(`${formatId}: <img src="pic.jpeg" class="frogs">`, async () => {
    //   const metaTemplate = await makeTemplates(
    //     {
    //       html: '<img src="../file.png" class="frogs">',
    //       css: ".frogs { background: green }",
    //       id: "imgSrc",
    //     },
    //     [formatId]
    //   );
    //   expect(metaTemplate).toMatchSnapshot();
    // });

    // it(`${formatId}: Form input[checked]`, async () => {
    //   const metaTemplate = await makeTemplates(
    //     {
    //       html: '<input id="textId" type="checkbox" >',
    //       css: "",
    //       id: "input",
    //     },
    //     [formatId]
    //   );
    //   expect(metaTemplate).toMatchSnapshot();
    // });

    // it(`${formatId}: H1 with configurable Id`, async () => {
    //   const metaTemplate = await makeTemplates(
    //     {
    //       html: '<h1 id="id">stuff</h1>',
    //       css: "",
    //       id: "h1Id",
    //     },
    //     [formatId]
    //   );
    //   expect(metaTemplate).toMatchSnapshot();
    // });

    // it(`${formatId}: Form label input[checked]`, async () => {
    //   const metaTemplate = await makeTemplates(
    //     {
    //       html:
    //         '<label for="textId"><input id="textId" type="checkbox" ></label>',
    //       css: "",
    //       id: "input",
    //     },
    //     [formatId]
    //   );
    //   expect(metaTemplate).toMatchSnapshot();
    // });

    // it(`${formatId}: Boolean attribute values`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html: `
    //       <div class="g-flex-row {{ isReversed?: g-flex-reverse }}">
    //         <mt-variable key="children">Columns</mt-variable>
    //       </div>`,
    //       css: `
    //       .g-flex-row {
    //         color:red;
    //       }
    //       .g-flex-row.g-flex-reverse {
    //         color: blue
    //       }
    //     `,
    //       id: "row",
    //     },
    //     [formatId]
    //   );
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });

    // it(`${formatId}: Boolean attribute values`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html: `
    //       <div class="g-form-group {{ errorId?: g-form-group--error }}">
    //         <fieldset class="g-fieldset" aria-describedby="hintId errorId">
    //           <legend class="g-fieldset__legend">
    //             <mt-variable key="legend">Legend text</mt-variable>
    //           </legend>
    //           <mt-if key="hintId">
    //             <div class="g-hint" id="hintId">
    //               <mt-variable key="hint">Hint text</mt-variable>
    //             </div>
    //           </mt-if>
    //           <mt-if key="errorId">
    //             <div class="g-error-message" id="errorId">
    //               <span class="g-visually-hidden">
    //                 Error:
    //               </span>
    //               <mt-variable key="error">Error text</mt-variable>
    //             </div>
    //           </mt-if>
    //           <div><mt-variable key="children">Fieldset contents</mt-variable></div>
    //         </fieldset>
    //       </div>`,
    //       css: `
    //       .g-flex-row {
    //         color:red;
    //       }
    //       .g-flex-row.g-flex-reverse {
    //         color: blue
    //       }
    //     `,
    //       id: "row",
    //     },
    //     [formatId]
    //   );
    //   const templateFormats = response.metaTemplates.map(
    //     (templateFormat) => templateFormat.formatId
    //   );
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });

    // it(`${formatId}: multiple <mt-if> key comparison`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html: `
    //         <mt-if key="mode?=firstChoice">
    //           here
    //         </mt-if>
    //         <mt-if key="mode?!=firstChoice">
    //           not
    //         </mt-if>
    //       `,
    //       css: ``,
    //       id: "mtcomparison",
    //     },
    //     [formatId]
    //   );
    //   console.log(JSON.stringify(response, null, 2));
    //   if (formatId === "react-ts") {
    //     throw Error(JSON.stringify(response, null, 2));
    //   }
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });

    // it(`${formatId}: aria-labelledby ids`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html: `
    //       <mt-if key="mode?=live">
    //         <div role="note" aria-live="polite" aria-atomic="true">
    //           <mt-variable key="children"> Example alert content </mt-variable>
    //         </div>
    //       </mt-if>
    //       <mt-if key="mode?!=live">
    //         <div role="note" tabindex="-1" aria-labelledby="headingId">
    //           <mt-variable key="children"> Example alert content </mt-variable>
    //         </div>
    //       </mt-if>
    //       `,
    //       css: ``,
    //       id: "labelledBy",
    //     },
    //     [formatId]
    //   );
    //   console.log(JSON.stringify(response, null, 2));
    //   if (formatId === "react-ts") {
    //     throw Error(JSON.stringify(response, null, 2));
    //   }
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });

    it(`${formatId}: make-usage mt-if`, async () => {
      const code: TemplateUsages = [
        {
          templateId: "Alert",
          variables: {
            level: "info",
            mode: "live",
            headingId: "heading1",
            children: [],
          },
        },
      ];
      const usages = await makeUsage(
        code,
        {
          Alert: {
            id: "Alert",
            html: `
            <mt-if key="mode?=live">
              <div role="note" aria-live="polite" aria-atomic="true">
                <div
                  class="g-alert {{ level: g-alert--info as info | g-alert--warning as warning | g-alert--success as success | g-alert--error as error }}"
                >
                  <mt-variable key="children"> Example alert content </mt-variable>
                </div>
              </div>
            </mt-if>
            <mt-if key="mode?!=live">
              <div role="note" tabindex="-1" aria-labelledby="headingId">
                <div
                  class="g-alert {{ level: g-alert--info as info | g-alert--warning as warning | g-alert--success as success | g-alert--error as error }}"
                >
                  <mt-variable key="children"> Example alert content </mt-variable>
                </div>
              </div>
            </mt-if>
            `,
            css: "",
          },
        },
        [formatId]
      );
      console.log(JSON.stringify(usages, null, 2));
      expect(usages).toMatchSnapshot();
    });

    // it(`${formatId}: Enum attribute values`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html: `
    //     <div class="{{ containerType: g-flex-container | g-flex-container-fluid }}">
    //       <mt-variable key="children">Rows...</mt-variable>
    //     </div>
    //   `,
    //       css: `
    //     .g-flex-container,
    //     .g-flex-container-fluid {
    //         background: red;
    //       color: purple
    //     }
    //     .g-flex-container-fluid {
    //       color: red;
    //     }
    //     @media only screen and (min-width: 48em) {
    //       .g-flex-container {
    //         color: blue
    //       }
    //     }`,
    //       id: "container",
    //     },
    //     [formatId]
    //   );
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });

    // it(`${formatId}: Lots of enum attribute values`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html: `
    //   <div
    //     class="g-flex-col
    //       {{ isReversed?: g-flex-reverse }}
    //       {{ columnXs: g-flex-col-xs | g-flex-col-xs-1 | g-flex-col-xs-2 | g-flex-col-xs-3 | g-flex-col-xs-4 | g-flex-col-xs-5 | g-flex-col-xs-6 | g-flex-col-xs-7 | g-flex-col-xs-8 | g-flex-col-xs-9 | g-flex-col-xs-10 | g-flex-col-xs-11 | g-flex-col-xs-12 }}
    //     "
    //   >
    //     <mt-variable key="children">Columns</mt-variable>
    //   </div>`,
    //       css: `
    //   .g-flex-col.g-flex-reverse {
    //       color: red;
    //   }
    //   .g-flex-reversed {
    //       color: green;
    //   }
    //   .g-flex-col-xs {
    //       color: blue;
    //   }`,
    //       id: "container",
    //     },
    //     [formatId]
    //   );
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });

    // it(`${formatId}: Link with boolean class`, async () => {
    //   const response = await makeTemplates(
    //     {
    //       html:
    //         '<a class="g-link {{ isMuted?: g-link--muted }}" href="#"><mt-variable key="children">Example text</mt-variable></a>',
    //       css: ".g-link { color: white } .g-link--muted { opacity: 0.5 }",
    //       id: "a",
    //     },
    //     [formatId]
    //   );
    //   expect(response.metaTemplates).toMatchSnapshot();
    // });
  });

  // it(`${formatId}: CSS Configuration (CSS Variables and Scss Variables)`, async () => {
  //   const cssVariables: CSSVariablePattern[] = [
  //     {
  //       id: "theme-color-white",
  //       defaultValue: "#ffffff",
  //       valueSubstringMatch: "#ffffff",
  //     },
  //   ];
  //   const response = await makeTemplates(
  //     {
  //       html:
  //         '<a class="g-link {{ isMuted?: g-link--muted }}" href="#"><mt-variable key="children">Example text</mt-variable></a>',
  //       css:
  //         ".g-link { color: #ffffff !important } .g-link--muted { opacity: 0.5 }",
  //       id: "a",
  //       cssVariables,
  //     },
  //     [formatId]
  //   );

  //   const { metaTemplates } = response;

  //   expect(metaTemplates).toMatchSnapshot();

  //   const metaTemplatesJson = JSON.stringify(metaTemplates);
  //   if (["scss", "css"].includes(formatId)) {
  //     expect(metaTemplatesJson.indexOf("!important") !== -1).toEqual(true);
  //     expect(
  //       metaTemplatesJson.indexOf("var(--theme-color-white") !== -1
  //     ).toEqual(true);
  //   }
  //   if (["scss"].includes(formatId)) {
  //     expect(metaTemplatesJson.indexOf("$theme-color-white") !== -1).toEqual(
  //       true
  //     );
  //   }
  // });

  // it(`${formatId}: CSS Configuration of Fonts`, async () => {
  //   const cssVariables: CSSVariablePattern[] = [
  //     {
  //       id: "theme-font-family",
  //       defaultValue: "Thing",
  //       valueSubstringMatch: "Arial, sans-serif",
  //     },
  //   ];
  //   const response = await makeTemplates(
  //     {
  //       html:
  //         '<a class="g-link" href="#"><mt-variable key="children">Example text</mt-variable></a>',
  //       css: ".g-link { font-family: Arial, sans-serif }",
  //       id: "a",
  //       cssVariables,
  //     },
  //     [formatId]
  //   );
  //   const { metaTemplates } = response;
  //   expect(metaTemplates).toMatchSnapshot();

  //   const metaTemplatesJson = JSON.stringify(metaTemplates);
  //   if (["scss", "css"].includes(formatId)) {
  //     expect(
  //       metaTemplatesJson.indexOf("var(--theme-font-family") !== -1
  //     ).toEqual(true);
  //   }
  //   if (["scss"].includes(formatId)) {
  //     expect(metaTemplatesJson.indexOf("$theme-font-family") !== -1).toEqual(
  //       true
  //     );
  //   }
  // });

  // it(`${formatId}: CSS Configuration (CSS Variables and Scss Variables)`, async () => {
  //   const cssVariables: CSSVariablePattern[] = [
  //     {
  //       id: "theme-color-white",
  //       defaultValue: "#ffffff",
  //       valueSubstringMatch: "#ffffff",
  //     },
  //   ];
  //   const response = await makeTemplates(
  //     {
  //       html:
  //         '<a class="g-link {{ isMuted?: g-link--muted }}" href="#"><mt-variable key="children">Example text</mt-variable></a>',
  //       css:
  //         '.g-link { background: #ffffff url("big.gif") !important } .g-link--muted { opacity: 0.5 }',
  //       id: "a",
  //       cssVariables,
  //     },
  //     [formatId]
  //   );
  //   const { metaTemplates } = response;
  //   expect(metaTemplates).toMatchSnapshot();
  //   if (["scss", "css"].includes(formatId)) {
  //     // FIXME: update with Jest substring match so we get better
  //     // error messages about the strings we're comparing.
  //     expect(
  //       JSON.stringify(metaTemplates).indexOf("!important") !== -1
  //     ).toBeTruthy();
  //     expect(
  //       JSON.stringify(metaTemplates).indexOf("big.gif") !== -1
  //     ).toBeTruthy();
  //   }
  // });

  // it(`${formatId}: makeUsage`, async () => {
  //   const code: TemplateUsages = [
  //     {
  //       templateId: "H1",
  //       variables: {
  //         children: [
  //           {
  //             templateId: "A",
  //             variables: {
  //               href: "https://html5zombo.com/",
  //               children: "Click me",
  //               reversed: "On",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   const usages = await makeUsage(
  //     code,
  //     {
  //       H1: {
  //         id: "H1",
  //         html: '<h1><mt-variable key="children"/></h1>',
  //         css: "",
  //       },
  //       A: {
  //         id: "A",
  //         html:
  //           '<a href="{{href}}" class="{{ reversed: g-on as On | g-off as Off }}"><mt-variable key="children"/></a>',
  //         css: "",
  //       },
  //     },
  //     [formatId]
  //   );
  //   expect(usages).toMatchSnapshot();
  // });

  // it(`${formatId}: makeUsage with booleans`, async () => {
  //   const code: TemplateUsages = [
  //     {
  //       templateId: "H1",
  //       variables: {
  //         children: [
  //           {
  //             templateId: "A",
  //             variables: {
  //               href: "https://html5zombo.com/",
  //               children: "Click me",
  //               isReversed: true,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   const usages = await makeUsage(
  //     code,
  //     {
  //       H1: {
  //         id: "H1",
  //         html: '<h1><mt-variable key="children"/></h1>',
  //         css: "",
  //       },
  //       A: {
  //         id: "A",
  //         html:
  //           '<a href="{{href}}" class="{{ isReversed: g-on as On }}"><mt-variable key="children"/></a>',
  //         css: "",
  //       },
  //     },
  //     [formatId]
  //   );
  //   expect(usages).toMatchSnapshot();
  // });

  // it(`${formatId}: jsxToUsageCode`, async () => {
  //   const code: TemplateUsages = [
  //     {
  //       templateId: "H1",
  //       variables: {
  //         children: [
  //           {
  //             templateId: "A",
  //             variables: {
  //               href: "https://html5zombo.com/",
  //               children: "Click me",
  //               reversed: "On",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   const usages = await jsxToUsageCode(
  //     '<H1><A href="https://html5zombo.com/">Click me</A></H1>'
  //   );

  //   expect(usages).toEqual([
  //     {
  //       templateId: "H1",
  //       variables: {
  //         children: [
  //           {
  //             templateId: "A",
  //             variables: {
  //               href: "https://html5zombo.com/",
  //               children: "Click me",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ]);
  // });

  // it(`${formatId}: jsxToUsageCode with boolean true`, async () => {
  //   const code: TemplateUsages = await jsxToUsageCode(
  //     `<Ul isBulleted>
  //       <Li>Unordered item one</Li>
  //       <Li>Unordered item two</Li>
  //     </Ul>`
  //   );

  //   expect(code).toEqual([
  //     {
  //       templateId: "Ul",
  //       variables: {
  //         isBulleted: true,
  //         children: [
  //           {
  //             templateId: "Li",
  //             variables: {
  //               children: "Unordered item one",
  //             },
  //           },
  //           {
  //             templateId: "Li",
  //             variables: {
  //               children: "Unordered item two",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ]);

  //   const usages = await makeUsage(
  //     code,
  //     {
  //       Ul: {
  //         id: "Ul",
  //         html:
  //           '<ul class="{{ isBulleted: g-on }}"><mt-variable key="children"/></ul>',
  //         css: "",
  //       },
  //       Li: {
  //         id: "Li",
  //         html: '<li><mt-variable key="children"/></li>',
  //         css: "",
  //       },
  //     },
  //     [formatId]
  //   );

  //   expect(usages).toMatchSnapshot();
  // });

  // it(`${formatId}: jsxToUsageCode with boolean false`, async () => {
  //   const code: TemplateUsages = await jsxToUsageCode(
  //     `<Ul isBulleted={false}>
  //       <Li>Unordered item one</Li>
  //       <Li>Unordered item two</Li>
  //     </Ul>`
  //   );

  //   expect(code).toEqual([
  //     {
  //       templateId: "Ul",
  //       variables: {
  //         isBulleted: "false",
  //         children: [
  //           {
  //             templateId: "Li",
  //             variables: {
  //               children: "Unordered item one",
  //             },
  //           },
  //           {
  //             templateId: "Li",
  //             variables: {
  //               children: "Unordered item two",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ]);

  //   const usages = await makeUsage(
  //     code,
  //     {
  //       Ul: {
  //         id: "Ul",
  //         html:
  //           '<ul class="{{ isBulleted: g-on }}"><mt-variable key="children"/></ul>',
  //         css: "",
  //       },
  //       Li: {
  //         id: "Li",
  //         html: '<li><mt-variable key="children"/></li>',
  //         css: "",
  //       },
  //     },
  //     [formatId]
  //   );

  //   expect(usages).toMatchSnapshot();
  // });

  // it(`${formatId}: jsxToUsageCode with boolean false and inline HTML`, async () => {
  //   const code: TemplateUsages = await jsxToUsageCode(
  //     `<Ul isBulleted={false}>
  //       <Li>Unordered <a href="http://zombo.com/">item one</a></Li>
  //       <Li>Unordered item two</Li>
  //     </Ul>`
  //   );

  //   const usages = await makeUsage(
  //     code,
  //     {
  //       Ul: {
  //         id: "Ul",
  //         html:
  //           '<ul class="{{ isBulleted: g-on }}"><mt-variable key="children"/></ul>',
  //         css: "",
  //       },
  //       Li: {
  //         id: "Li",
  //         html: '<li><mt-variable key="children"/></li>',
  //         css: "",
  //       },
  //     },
  //     [formatId]
  //   );

  //   expect(usages).toMatchSnapshot();
  // });

  // it(`${formatId}: jsxToUsageCode with enumerations`, async () => {
  //   const code: TemplateUsages = await jsxToUsageCode(
  //     `<Div containerType="fixed"></Div>`
  //   );

  //   const usages = await makeUsage(
  //     code,
  //     {
  //       Div: {
  //         id: "Ul",
  //         html:
  //           '<div class="{{ containerType: g-flex-container as fixed | g-flex-container-fluid as fluid }}">test</div>',
  //         css: "",
  //       },
  //     },
  //     [formatId]
  //   );

  //   expect(usages).toMatchSnapshot();
  // });

  // it(`${formatId}: CalculatedProps`, async () => {
  //   const metaTemplate = await makeTemplates(
  //     {
  //       html: "<input>",
  //       css: "",
  //       id: "textbox",
  //       calculatedDynamicKeys: [
  //         { key: "textValueLength", expression: "textValue.length" },
  //       ],
  //     },
  //     [formatId]
  //   );
  //   expect(metaTemplate).toMatchSnapshot();
  // });

  // it(`${formatId}: retains name prop`, async () => {
  //   const html = `
  //     <input id="yearId" name="yearName" type="text" maxlength="4" />
  //     <input id="monthId" name="monthName" value="value2" type="text" maxlength="2" />
  //     <input id="dayId" name="dayName" value="value3" type="text" maxlength="2" />
  //   `;
  //   const metaTemplate = await makeTemplates(
  //     {
  //       html,
  //       css: "",
  //       id: "textboxes",
  //     },
  //     [formatId]
  //   );

  //   expect(metaTemplate).toMatchSnapshot();
  // });

  // it(`${formatId}: renders aria-current`, async () => {
  //   const html = `
  //     <a aria-current="{{ ariaCurrent }}" href="#">test</a>
  //   `;
  //   const metaTemplate = await makeTemplates(
  //     {
  //       html,
  //       css: "",
  //       id: "ariacurrent",
  //     },
  //     [formatId]
  //   );
  //   console.log(JSON.stringify(metaTemplate, null, 2));

  //   expect(metaTemplate).toMatchSnapshot();
  // });

  // it(`${formatId}: renders aria-expanded`, async () => {
  //   const html = `
  //     <button aria-expanded="{{ isOpen }}">test</button>
  //   `;
  //   const metaTemplate = await makeTemplates(
  //     {
  //       html,
  //       css: "",
  //       id: "ariaexpanded",
  //     },
  //     [formatId]
  //   );
  //   console.log("aria-expanded", JSON.stringify(metaTemplate, null, 2));

  //   expect(metaTemplate).toMatchSnapshot();
  // });
};
