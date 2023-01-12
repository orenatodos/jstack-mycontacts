import logoImg from '../../assets/images/logo.svg'

import * as Styled from './Header.styles'

export function Header () {
  return (
    <Styled.Container>
      <img src={logoImg} alt="MyContacts" width="200" />
    </Styled.Container>
  )
}
