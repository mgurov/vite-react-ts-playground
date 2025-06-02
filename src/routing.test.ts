import { expect, test, describe } from 'vitest'
import { normalizePathName, getPageRouteObject, pathsToRoutes } from './routing.js'

describe('normalizePathName', () => {
  test('removes index', () => {
    expect(normalizePathName('foo/index')).toBe('foo')
    expect(normalizePathName('index')).toBe('')
  })
  test('replaces $ with :', () => {
    expect(normalizePathName('foo/$id')).toBe('foo/:id')
    expect(normalizePathName('$slug/index')).toBe(':slug')
  })
  test('handles dots in path', () => {
    expect(normalizePathName('foo.bar/index')).toBe('foo/bar')
  })
})

test('getPageRouteObject returns correct route object', () => {
  const page = { default: () => null }
  const route = getPageRouteObject('./routes/foo.tsx', 'foo', page)
  expect(route.path).toBe('/foo')
  expect(route.Component).toBe(page.default)
})

test('pathsToRoutes skips files without default export', () => {
  const pages = {
    './routes/foo.tsx': { notDefault: () => null }
  }
  expect(() => pathsToRoutes(pages)).toThrow()
})

test('pathsToRoutes returns correct routes', () => {
  const pages = {
    './routes/index.tsx': { default: () => null },
    './routes/foo.tsx': { default: () => null }
  }
  const routes = pathsToRoutes(pages)
  expect(routes.length).toBe(2)
  expect(routes[0].path).toBe('/')
  expect(routes[1].path).toBe('/foo')
})