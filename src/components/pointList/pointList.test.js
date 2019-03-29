import React from 'react'
import { PointList } from '.'
import renderer from 'react-test-renderer'

test('should render point list', () => {
  let items = [
    { id: 1, value: 'a' },
    { id: 2, value: 'b' },
    { id: 3, value: 'c' }
  ]

  const handleRemoveClick = jest.fn(id => () => {})
  const component = renderer.create(
    <PointList items={items} onRemoveClick={handleRemoveClick}/>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
