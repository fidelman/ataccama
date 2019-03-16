import styled, { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
`

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background: #eee;
  padding: 24px;
`
