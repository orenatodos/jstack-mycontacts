import { Link } from 'react-router-dom'

import arrowIcon from '../../assets/icons/arrow.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'

import * as Styled from './Home.styles'

export function Home () {
  return (
    <Styled.Container>
      <Styled.InputSearchContainer>
        <input type="text" placeholder='Pesquisar contato...'/>
      </Styled.InputSearchContainer>

      <Styled.Header>
        <strong>3 contatos</strong>

        <Link to="/new">Novo contato</Link>
      </Styled.Header>

      <Styled.ListContainer>
        <header>
          <button type='button'>
            Nome

            <img src={arrowIcon} alt="Arrow" width={15} />
          </button>
        </header>

        <Styled.Card>
          <div className='info'>
            <div className="contact-name">
              <strong>Renato Silva</strong>
              <small>Instagram</small>
            </div>

            <span>orenatodos@gmail.com</span>
            <span>(11) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={editIcon} alt="Edit" width={20} />
            </Link>

            <button type="button">
              <img src={trashIcon} alt="Delete" width={20} />
            </button>
          </div>
        </Styled.Card>
      </Styled.ListContainer>
    </Styled.Container>
  )
}
