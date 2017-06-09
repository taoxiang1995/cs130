import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './style.css';

/*
Reference: this component is copied from Tao Xiang's previous project.
The original repo is here: https://github.com/scalableinternetservices/free-and-for-sale-frontend
*/

//this.props.type: warning error success
//this.props.content:
//this.props.shouldOpen:
class Alert extends Component {

  constructor(props){
    super(props);
    this.state = {
      phoneNumber:''
    }
  }

  componentWillMount() {
    this.shouldShowAlert();
  }

  handleOnPhoneNumberInput(e){
    this.setState({
      phoneNumber:e.target.value
    })
  }

  handleSendIconClick(){
    this.props.postPhoneNumber(this.state.phoneNumber);
    this.props.handleCloseIconClick();
  }

  shouldShowAlert(){
    if(this.props.shouldOpen && this.props.type != 'warm'){
      return (
        <ReactCSSTransitionGroup
          className="Alert"
          transitionName="Alert"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={1000}
          >
          <div className={"Alert-container "+this.props.type}>
            <div className="Alert-container-content">
              {this.props.content? this.props.content : "There is no messages to show now." }
            </div>
            <div className="Alert-container-close">
              <i onClick={this.props.handleCloseIconClick} className="fa fa-times fa-3x Alert-container-close-icon" aria-hidden="true"></i>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      )
    }
    else if (this.props.shouldOpen && this.props.type == 'warm') {
      return(
        <ReactCSSTransitionGroup
          className="Alert"
          transitionName="Alert"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={1000}
          >
          <div className={"Alert-container "+this.props.type}>
            <div className="Alert-container-content">
              <input
                onChange={this.handleOnPhoneNumberInput.bind(this)}
                className="Alert-container-content-input"
                type='phoneNumber'
                name='phoneNumber'
                placeholder='Enter your cell phone number..'
                value = {this.state.phoneNumber}
                />
            </div>
            <div className="Alert-container-close">
              <i onClick={this.handleSendIconClick.bind(this)} className="fa fa-paper-plane-o fa-3x Alert-container-close-icon" aria-hidden="true"></i>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      )
    }
    else{
      return ""
    }
  }


  render(){
    return (
      <div>
        {this.shouldShowAlert()}
      </div>
    )
  }
}

export default Alert;