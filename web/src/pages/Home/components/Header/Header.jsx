import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as Styled from './Header.styles'

export function Header ({
  qtyOfContacts,
  qtyOfFilteredContacts,
  hasError
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
        qtyOfContacts > 0
          ? 'space-between'
          : 'center'
      )

  return (
    <Styled.Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfContacts > 0) && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}

      <Link to="/new">Novo contato</Link>
    </Styled.Container>
  )
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired
}
