import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

const originalTemplates = {};
function mockTemplate(templateName) {
  if (!originalTemplates[templateName]) {
    originalTemplates[templateName] = Template[templateName];
    // Mock the template with a Blaze template doing nothing
    Template[templateName] = new Blaze.Template(templateName, () => {});
  } else {
    throw new Error(`
      Template ${templateName} was already mocked.
      Please restore it before
    `);
  }
  
}

function restoreTemplate(templateName) {
  if (originalTemplates[templateName]) {
    Template[templateName] = originalTemplates[templateName];
    originalTemplates[templateName] = undefined;
  }
  
}

export {
  mockTemplate,
  restoreTemplate
}
