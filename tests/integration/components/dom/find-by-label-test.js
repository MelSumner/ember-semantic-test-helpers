import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import findByLabel from 'ember-semantic-test-helpers/test-support/dom/find-by-label';
import { inputQuery } from 'ember-semantic-test-helpers/test-support/dom/selectors';

module('Integration | Helper | findByLabel', function(hooks) {
  setupRenderingTest(hooks);

  test('it selects the correct element', async function(assert){
    await render(hbs`
      <label for="expected">hello</label>
      <div id="expected">
        <input name="expected"  />
      </div>
      <textarea id="unexpected" />
    `);
    let foundInput = findByLabel(inputQuery, 'hello');
    let expected = document.querySelectorAll("[name='expected']")[0];
    assert.equal(foundInput.length, 1);
    assert.equal(foundInput[0], expected);
  });


  test('if id is on control it finds control', async function(assert) {
    await render(hbs`
      <label for="control">Label of control</label>
      <div class="day-slider">
        <div id="control" class="day-slider-handle" role="slider"
           aria-valuemin="1"
           aria-valuemax="7"
           aria-valuenow="2"
           aria-valuetext="Monday">
       </div>
      </div>
    `);
    let foundInput = findByLabel(inputQuery, 'Label of control');
    let expected = document.querySelectorAll('#control')[0];
    assert.equal(foundInput.length, 1);
    assert.equal(foundInput[0], expected);
  });
});