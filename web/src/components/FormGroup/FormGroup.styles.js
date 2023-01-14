import styled from 'styled-components'

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      right: 16px;
      top: 18px;
    }
  }
`
