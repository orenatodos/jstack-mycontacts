import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'
import { ContactList } from './components/ContactList'
import { EmptyList } from './components/EmptyList'
import { ErrorStatus } from './components/ErrorStatus'
import { Header } from './components/Header'
import { InputSearch } from './components/InputSearch'
import { SearchNotFound } from './components/SearchNotFound'

import { useHome } from './useHome'

import * as Styled from './Home.styles'

export function Home () {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  } = useHome()

  const hasContacts = !!contacts.length
  const isListEmpty = !hasError && (!isLoading && !hasContacts)
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1)

  return (
    <Styled.Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (
        <ErrorStatus onTryAgain={handleTryAgain} />
      )}

      {isListEmpty && <EmptyList />}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
            isLoadingDelete={isLoadingDelete}
            isDeleteModalVisible={isDeleteModalVisible}
            contactBeingDeleted={contactBeingDeleted}
            onCloseDeleteModal={handleCloseDeleteModal}
            onConfirmDeleteContact={handleConfirmDeleteContact}
          />

          <Modal
            isVisible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            danger
            title={
              `Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`
            }
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Está ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Styled.Container>
  )
}
