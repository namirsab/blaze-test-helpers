# Blaze Test helpers

Example usage
```javascript
import { withRenderedTemplate } from 'meteor/planefy:blaze-test-helpers';

describe('Lists_show', function () {
  beforeEach(function () {
    Template.registerHelper('_', key => key);
  });

  afterEach(function () {
    Template.deregisterHelper('_');
  });

  it('renders correctly with simple data', function () {
    const list = Factory.build('list');
    const timestamp = new Date();

    // Create a local collection in order to get a cursor
    // Note that we need to pass the transform in so the documents look right when they come out.
    const todosCollection = new Mongo.Collection(null, { transform: Todos._transform });
    _.times(3, i => {
      const todo = Factory.build('todo', {
        listId: list._id,
        createdAt: new Date(timestamp - (3 - i)),
      });
      todosCollection.insert(todo);
    });
    const todosCursor = todosCollection.find({}, { sort: { createdAt: -1 } });

    const data = {
      list: () => list,
      todosReady: true,
      todos: todosCursor,
    };

    withRenderedTemplate('Lists_show', data, el => {
      const todosText = todosCursor.map(t => t.text);
      const renderedText = $(el).find('.list-items input[type=text]')
        .map((i, e) => $(e).val())
        .toArray();
      chai.assert.deepEqual(renderedText, todosText);
    });
  });
});
```
