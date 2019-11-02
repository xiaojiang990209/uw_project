import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import Weather from '../../components/Weather';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 75%;
  margin: 10px auto;
`;

function Dashboard(props) {
  return <Wrapper><Weather /></Wrapper>
}

// class Dashboard extends Component {
//   onLogoutClick = (e) => {
//     e.preventDefault();
//     this.props.logoutUser();
//   };

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.session.isAuthenticated) {
//       this.props.history.push('/login');
//     }
//   }

//   render() {
//     return (
//       <div style={{ height: '75vh' }} className="container valign-wrapper">
//         <div className="row">
//           <div className="col s12 center-align">
//             <h4>
//               <p className="flow-text grey-text text-darken-1">
//                 You're logged into a fullstack MERN app
//               </p>
//             </h4>
//             <button
//               style={{
//                 width: '150px',
//                 borderRadius: '3px',
//                 letterSpacing: '1.5px',
//                 marginTop: '1rem',
//               }}
//               onClick={this.onLogoutClick}
//               className="btn btn-large wave-effects wave-light hoverable blue accent-3"
//             >
//               Log out
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
