import React from 'react'
import { SearchBar } from '.'
import renderer from 'react-test-renderer'

test('should render search box', () => {
  const component = renderer.create(
    <SearchBar value={'Some value'} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
