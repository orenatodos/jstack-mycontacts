import PropTypes from 'prop-types'

import { Button } from '../../../../components/Button'

import sadImage from '../../../../assets/images/sad.svg'

import * as Styled from './ErrorStatus.styles'

export function ErrorStatus ({ onTryAgain }) {
  return (
    <Styled.Container>
      <img src={sadImage} alt="Sad" width={84} height={84} />

      <div className="details">
        <strong>
          Ocorreu um erro ao obter os seus contatos!
        </strong>

        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Styled.Container>
  )
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired
}
