import merge from 'deepmerge'
import endpoint from './api'

export function authHeader () {
}

export default function fetchBackend (path, appendedConfig) {
  const defaultConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const config = merge(appendedConfig, defaultConfig)

  return fetch(endpoint.concat(path), config)
}
