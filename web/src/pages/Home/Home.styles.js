import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-top: 32px;
`

export const InputSearchContainer = styled.div`
  width: 100%;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.04));

  input {
    width: 100%;
    background: #FFF;
    border: 0;
    border-radius: 25px;
    height: 50px;
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`

export const Header = styled.header`
  ${({ theme, justifyContent }) => css`
    display: flex;
    align-items: center;
    justify-content: ${justifyContent};
    border-bottom: 2px solid ${theme.colors.gray[100]};
    margin-top: 32px;
    padding-bottom: 16px;

    strong {
      color: #222;
      font-size: 24px;
    }

    a {
      color: ${theme.colors.primary.main};
      font-weight: bold;
      border: 2px solid currentColor;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.2s ease-in;

      &:hover {
        background: ${theme.colors.primary.main};
        color: #FFF;
      }
    }
  `}
`

export const ListContainer = styled.div`
  ${({ theme, orderBy }) => css`
    margin-top: 24px;

    header {
      margin-bottom: 8px;

      button {
        background: transparent;
        border: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${theme.colors.primary.main};
        font-weight: bold;

        img {
          transform: ${orderBy === 'ASC' ? 'rotate(180deg)' : 'rotate(0)'};
          transition: transform 0.2s ease-in;
        }
      }
    }
  `}
`

export const Card = styled.article`
  ${({ theme }) => css`
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: 16px;
    }

    .info {
      .contact-name {
        display: flex;
        align-items: center;
        gap: 8px;

        small {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px;
          border-radius: 4px;
        }
      }

      span {
        display: block;
        color: ${theme.colors.gray[200]};
        font-size: 14px;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        background: transparent;
        border: 0;
      }
    }
  `}
`

export const EmptyListContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      color: ${theme.colors.gray[200]};
      text-align: center;
      margin-top: 8px;

      strong {
        color: ${theme.colors.primary.main};
      }
    }
  `}
`

export const ErrorContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 24px;

    .details {
      strong {
        font-size: 22px;
        color: ${theme.colors.danger.main};
        display: block;
        margin-bottom: 8px;
      }
    }
  `}
`

export const SearchNotFoundContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    align-items: start;
    gap: 24px;

    p {
      color: ${theme.colors.gray[200]};
      word-break: break-word;
    }
  `}
`
