import emptyBoxImage from '../../../../assets/images/empty-box.svg'

import * as Styled from './EmptyList.styles'

export function EmptyList () {
  return (
    <Styled.Container>
      <img
        src={emptyBoxImage}
        alt="Empty Box"
        width={110}
        height={77}
      />

      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
      </p>
    </Styled.Container>
  )
}
