Package.describe({
  name: 'planefy:blaze-test-helpers',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Test rendered Blaze templates',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  testOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use([
    'ecmascript',
    'underscore',
    'tracker',
    'templating',
    'blaze'
  ]);

  api.mainModule('blaze-test-helpers.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('blaze-test-helpers');
  api.mainModule('blaze-test-helpers-tests.js');
});
