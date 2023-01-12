import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import arrowIcon from '../../assets/icons/arrow.svg'

import * as Styled from './PageHeader.styles'

export function PageHeader ({ title }) {
  return (
    <Styled.Container>
      <Link to="/">
        <img src={arrowIcon} alt="Back" width={14} />
        <span>Voltar</span>
      </Link>

      <h1>{title}</h1>
    </Styled.Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
}
