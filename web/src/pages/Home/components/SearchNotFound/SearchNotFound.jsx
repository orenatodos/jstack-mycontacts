import PropTypes from 'prop-types'

import * as Styled from './SearchNotFound.styles'

import magnifierQuestionImage from '../../../../assets/images/magnifier-question.svg'

export function SearchNotFound ({ searchTerm }) {
  return (
    <Styled.Container>
      <img
        src={magnifierQuestionImage}
        alt="Magnifier question"
        width={58}
        height={58}
      />

      <p>
        Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
      </p>
    </Styled.Container>
  )
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired
}
