import PropTypes from 'prop-types'

import * as Styled from './InputSearch.styles'

export function InputSearch ({ value, onChange }) {
  return (
    <Styled.Container>
      <input
        type="text"
        placeholder='Pesquisar contato...'
        value={value}
        onChange={onChange}
      />
    </Styled.Container>
  )
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
