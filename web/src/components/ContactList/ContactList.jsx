import * as Styled from './ContactList.styles'

import arrowIcon from '../../assets/icons/arrow.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'

export function ContactList () {
  return (
    <Styled.Container>
      <Styled.Header>
        <strong>3 contatos</strong>

        <a href="#">Novo contato</a>
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
            <a href="#">
              <img src={editIcon} alt="Edit" width={20} />
            </a>

            <button type="button">
              <img src={trashIcon} alt="Delete" width={20} />
            </button>
          </div>
        </Styled.Card>

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
            <a href="#">
              <img src={editIcon} alt="Edit" width={20} />
            </a>

            <button type="button">
              <img src={trashIcon} alt="Delete" width={20} />
            </button>
          </div>
        </Styled.Card>
      </Styled.ListContainer>
    </Styled.Container>
  )
}
