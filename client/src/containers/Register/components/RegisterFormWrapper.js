import styled from 'styled-components';

export const RegisterFormWrapper = styled.div`
  text-align: center;

  width: 404px;
  max-width: 404px;
  padding: 32px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
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
`;

export default RegisterFormWrapper;
