import styled from 'styled-components';

export const RegisterFormWrapper = styled.div`
  text-align: center;

  width: 404px;
  max-width: 404px;
  padding: 32px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px rgba(17, 49, 96, 0.08), 0 1px 3px 0 rgba(17, 49, 96, 0.08);
  .form-group {
    margin-bottom: 22px;
  }
  .row {
    text-align: center;
    margin-top: 20px;
  }

  .auth-logo {
    width: 140px;
    margin-bottom: 32px;
  }

  .auth__link {
    padding-top: 5px;
    text-align: left;
  }

  .passwordInput {
    position: relative;

    .forgotLink {
      position: absolute;
      top: 13px;
      right: 15px;
      color: #5d9df5;
      cursor: pointer;
      font-size: 13px;
    }

    .viewPassword {
      position: absolute;
      top: 17px;
      right: 16px;
      cursor: pointer;
    }

    .hiddenEye {
      top: 15px;
    }
  }

  .confirm-helper {
    font-size: 15px;
    line-height: 22px;
    color: #62778c;
    margin-bottom: 24px;
    text-align: left;
  }

  .errorContainer {
    color: #e91e63;
    font-size: 13px;
    line-height: 15px;
    padding: 13px;
    background: #ffffff;
    box-shadow: 0px 1px 3px rgba(17, 49, 96, 0.08), 0px 0px 1px rgba(17, 49, 96, 0.08);
    border-radius: 5px;
    margin: 32px 0;
    text-align: left;
    img {
      width: 16px;
      height: 16px;
    }
    .col-1 {
      padding: 0;
    }
    .col-11 {
      padding: 0;
    }
  }
`;

export default RegisterFormWrapper;
