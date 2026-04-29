import figma, {html} from '@figma/code-connect/html';

figma.connect('https://www.figma.com/design/hYODY1E7tb4WdMJTQUNm2G/Material-3-Design-Kit?node-id=57994-2227&m=dev', {
  example: () =>
    html`<md-filled-button>Button</md-filled-button>`,
  imports: ["import '@material/web/button/filled-button.js'"],
});
