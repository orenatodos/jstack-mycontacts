import styled, { css } from 'styled-components'

export const Container = styled.div`
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
