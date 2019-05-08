<img src="peacock.png" alt="">

# MetaTemplate

MetaTemplate is a web template/component generator that can take a single template definition and output multiple templates/components in:

- React JavaScript or TypeScript, with or without Styled-Components
- Vue (beta)
- SilverStripe (beta)
- Mustache/Handlebars
- CSS/SCSS with SCSS Variables and CSS Variables
- HTML

The input format to generate these is standard CSS, and _almost_ standard HTML (MetaHTML -- for details, see the API docs below).

This is particularly useful for Design Systems / Pattern Libraries where a single template definition could be converted into multiple template/components.

## :gift: Features

- Single-source template generator.
- MetaTemplate bundles only the CSS relevant to your component, so give it your whole CSS file and HTML and then MetaTemplate will try to 'tree shake' your CSS, SCSS, and Styled Components declarations.
- SCSS/CSS Variable replacement... define substring matches in CSS values and replace them with Scss Variables and [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/var). Match a colour of `"#336699"` and replace it with variable named `theme-color-background` that will be replaced in situ with references to Scss/CSS variables that you can define at `./scss/_settings.scss` or CSS Variable declarations.

## :palm_tree: Examples

Both these examples come from [FlexBoxGrid.com](http://flexboxgrid.com/) and we've chosen two components with different complexities.

### 🌰 Basic example: input tag

_Input:_ [MetaHTML](./examples/input/input.html) and standard [CSS](./examples/input/input.css).

_Output:_ [React JS](./examples/input/react-js/input.js), [React TS](./examples/input/react-ts/input.tsx), [React JS with Styled Components](./examples/input/react-js-styled-components/input.js), [React TS with Styled Components](./examples/input/react-ts-styled-components/input.tsx), [Mustache/Handlebars](./examples/input/mustache/input.mustache), [SilverStripe Components](./examples/input/silverstripe/input.ss), [Vue](./examples/input/vue-js/input.vue), [Sass (SCSS)](./examples/input/scss/input.scss), and finally [HTML](./examples/input/html/input.html) and [CSS](./examples/input/css/input.css).

### :seedling: Slightly more complicated example: FlexBox Container

_Input:_ [MetaHTML](./examples/container/input.html) and standard [CSS](./examples/container/input.css).

_Output:_ [React JS](./examples/container/react-js/FlexContainer.js), [React TS](./examples/container/react-ts/FlexContainer.tsx), [React JS with Styled Components](./examples/container/react-js-styled-components/FlexContainer.js), [React TS with Styled Components](./examples/container/react-ts-styled-components/FlexContainer.tsx), [Mustache/Handlebars](./examples/container/mustache/FlexContainer.mustache), [SilverStripe Components](./examples/container/silverstripe/FlexContainer.ss), [Sass (SCSS)](./examples/container/scss/FlexContainer.scss), [Vue](./examples/container/vue-js/FlexContainer.vue), and finally [HTML](./examples/container/html/FlexContainer.html) and [CSS](./examples/container/css/FlexContainer.css).

### :deciduous_tree: Complex example: FlexBox Column

_Input:_ [MetaHTML](./examples/column/input.html) and standard [CSS](./examples/column/input.css).

_Output:_ [React JS](./examples/column/react-js/FlexColumn.js), [React TS](./examples/column/react-ts/FlexColumn.tsx), [React JS with Styled Components](./examples/column/react-js-styled-components/FlexColumn.js), [React TS with Styled Components](./examples/column/react-ts-styled-components/FlexColumn.tsx), [Mustache/Handlebars](./examples/column/mustache/FlexColumn.mustache), [SilverStripe](./examples/column/silverstripe/FlexColumn.ss), [Sass (SCSS)](./examples/column/scss/FlexColumn.scss), [Vue](./examples/column/vue-js/FlexColumn.vue), and finally [HTML](./examples/column/html/FlexColumn.html) and [CSS](./examples/column/css/FlexColumn.css).

## :crystal_ball: Future

- Loops, although because we support `children` (childNode) values you can probably nest other components instead.
- Better support for weird CSS.
- More formats... contribute your favourite!

## :warning: Limitations

- The CSS 'tree shaking' can't handle complicated CSS such as `:not(.class)` and probably other features too, so check the output formats yourself.
- This library uses `JSDOM` to parse HTML/CSS which mimics a browser environment inside Node.js. The JSDOM developers themselves note that it's possible to escape their sandbox when given malicious input, so don't use MetaTemplate (or JSDOM) with untrusted input, ya dingus.

## :satellite: API

TypeScript types are provided.

### makeTemplate

    async makeTemplate(template, formatIds) => {}

The purpose of this function is to return templates in a variety of formats.

It's an async function that takes a `Template` object and an optional array of template format ids. If the 2nd argument isn't provided a default list of formats is used instead.

_Returns_ a promise that resolves to a `Files` Object that represents a file archive, with Object keys as paths and values as strings of the templates. ie, `{ 'scss/button.scss': 'scss file data', 'mustache/button.mustache': 'mustache template data' }`.

---

The 1st argument `Template` Object looks like,

    {
    id,
    html,
    css,
    cssVariables
    }

- `id` is a required string that is used as the `TemplateId`. This is your arbitrary but unique name for this template so use something meaningful. ie, FlexColumn.
- `html` is a required string of _Sorta "HTML"_.
- `css` is a required string of standard CSS.
- `cssVariables` is an optional Array of Objects shaped like `{ id, defaultValue, nameMatch, valueMatch, valueSubstringMatch }`,
  - `id` is a required string for the variable name that will be made in Scss Variables and CSS Variables.
  - `defaultValue`: is a required string of your preferred default value for this variable.
  - `nameMatch`, `valueMatch`, and `valueSubstringMatch` are all optional strings, and you would choose one of them to match the CSS that you want to insert a variable at. If you want to replace a substring ie, "#000000" with "theme-color-dark" then you might write `[{ id: 'theme-color-black', defaultValue: '#000000', valueSubstringMatch: '#000000' }]` to match that substring and replace it with variables. Currently there's no way of not outputting CSS Variables.

#### Sorta "HTML" ?

This is standard HTML with two types of references for template variables:

- In Attribute values:

  - For making a required variable string `{{ variableName }}` eg `<span class="{{ class }}">`
    - Use a `?` after the variable name to make it optional
    - Multiple variables can exist in an attribute value.
  - For making a required variable with enumerations `{{ variableName: option1 | option2 }}` eg `<span class="{{ color: class-red | class-blue }}">`
  - For making a variable with enumerations that have friendly names `{{ variableName: option1 as Option1 | option2 as Option2 }}` eg `&lt;span class="{{ color: class-red as Red | class-blue as Blue }}"&gt;`

- Inbetween elements:

  - `<mt-variable key="variableName">default value</mt-variable>` eg `<h1><mt-variable key="children">placeholder</mt-variable></h1>`

The reason why we need to extend this is to know which HTML/CSS to know to be configurable.

#### makeIndexImports

    makeIndexImports = async ( files, cssVariables ) => {}

The purpose of this function is to provide "index" definitions for each format. The exact details vary by format, but the Sass (Scss) makes a file with lots of `@import "id.scss"`, and the JavaScript/TypeScript has lazy-loaded imports. For Scss this also includes a `_settings.scss` for the Scss variables, hence the `cssVariables` argument.

The `files` Object is a required variable that represents a file archive, with Object keys as paths and values as strings of the file data. Typically you'd want to return the `files` object returned by the default export.

`cssVariables` is an optional Object with the same shape as the `cssVariables` argument given to the default export.

_Returns_ a `files` Object that represents a file archive, but now it has index files for each format (ie, `"scss/index.scss"`) to assist with importing files for that format.

#### makeUsage

    makeUsage = async ( code, templates, formatIds ) => {}

The purpose of this function is to convert a single code example (eg, in documentation) into examples from a variety of template formats.

`code` is a code example,

- _TIP:_ Try `jsxToUsageCode` for a slightly easier way of generating `code`.

It's datastructure is an Array of `TemplateConfig` Objects shaped like,

    { templateId, variables }

Where `templateId` is a string of the `TemplateId` (same as the default export... your arbitrary id for the template), and `variables` is an Object keyed by `variableName`s whose values can be strings or other TemplateConfig Objects. ie, `[{ templateId: 'H1', variables: { children: 'Hello' } }]` or `[{ templateId: 'H1', variables: { children: [{ templateId: 'A', variables: { href: 'https://html5zombo.com/', children: 'Click me' } }] } }]`.

`templates` is a required Object keyed by strings of `TemplateId`s whose values are `Template` Objects (like the default export). This must include every `templateId` referenced in `code`.

`formatIds` is an optional array of strings of the formats to use, with a complete list of formatIds as the default.

# jsxToUsageCode

    makeUsage = async ( jsx ) => {}

- jsx is a required string of JSX ie, `'<H1><A href="https://html5zombo.com/">Click me</A></H1>'` will return `[{ templateId: 'H1', variables: { children: [{ templateId: 'A', variables: { href: 'https://html5zombo.com/', children: 'Click me' } }] } }]`

A convenience function that parses a string of React JSX and returns a `code` variable for the makeUsage function.
