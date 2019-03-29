import React from 'react'
import { Suggestions } from '.'
import renderer from 'react-test-renderer'

test('should render suggestions', () => {
  const items = [
    { description: 'a' },
    { description: 'b' },
    { description: 'c' }
  ]
  const component = renderer.create(
    <Suggestions items={items} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
