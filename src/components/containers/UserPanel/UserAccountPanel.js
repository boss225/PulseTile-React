import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lifecycle } from 'recompose';

import PTButton from '../../ui-elements/PTButton/PTButton';
import UserAccountPanelSettings from './UserAccountPanelSettings';
import userAccountSelector from './selectors';
import userImage from '../../../assets/images/user.jpg'
import { clientUrls } from '../../../config/client-urls.constants';
import { unmountOnBlur } from '../../../utils/HOCs/unmount-on-blur.utils';
import { logoutStart } from '../../../ducks/logout.duck';
import { themeConfigs } from '../../../themes.config';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ logoutStart }, dispatch) });

@connect(userAccountSelector, mapDispatchToProps)
@lifecycle(unmountOnBlur)
export default class UserAccountPanel extends PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  render() {
    const { user, actions, onClick, onClose } = this.props;
    return (
      <div className="dropdown-user dropdown-menu-right dropdown-menu">
        <div
          className="user-profile-image"
          onClick={() =>{
            this.context.router.history.push(clientUrls.USER_PROFILE);
            onClick('')
          }}
        >
          <div className="img">
            <img src={userImage} alt="" />
          </div>
        </div>
        <div className="user-profile-info">
          <div
            className="user-profile-info__item name"
            onClick={() =>{
              this.context.router.history.push(clientUrls.USER_PROFILE);
              onClick('')
            }}
          >{user.given_name} {user.family_name}</div>
          <div class="user-profile-info__descr">
            <div className="user-profile-info__item role">{user.role}</div>
            <div className="user-profile-info__item email">{user.email}</div>
            <div className="user-profile-info__item time">10/05/2099</div>
          </div>
          <div className="specification">
            <div className="user-profile-info__title registered">Registered GP</div>
            <div className="user-profile-info__item address">About Showcase Stack; PulseTile version 1.0.0/QEWD_Ripple version 1.0.0</div>
          </div>
          <PTButton className="btn btn-theme btn-block btn-signout">
            <div onClick={actions.logoutStart}>
              <span className="brn-text">Sign Out</span> <i className="btn-icon fa fa-sign-out" />
            </div>
          </PTButton>
        </div>
        { themeConfigs.isShowUserProfileSettings && <UserAccountPanelSettings onClose={onClose}/> }
      </div>
    )
  }
}
