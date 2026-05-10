export function formatMessage(template, params) {
  var text = template;
  if (params) {
    for (var k in params) {
      text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
    }
  }
  return text;
}