import axios from 'axios'
import config from '@/config'

const loginConfig = {
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const LoginAPIInstance = axios.create(loginConfig)

const defaultConfig = {
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const DefaultAPIInstance = axios.create(defaultConfig)
