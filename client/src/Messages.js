import React, { Component } from 'react';
import Header from './Header';
import './css/Messages.css'
import ChatBoard from './chatBoard'
import { myFirebase, myFirestore } from './firebase'

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:8080');

class Messages extends Component {
	constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null
    }
    this.currentUserId = JSON.parse(window.localStorage.getItem("user"));
    // this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)
    this.currentUserNickname = JSON.parse(window.localStorage.getItem("user"));
    this.listUser = []
	this.viewListUser1 = []
  }

  componentDidMount() {
    // this.checkLogin()
	 // this.getListUser()
	 this.renderListUser();
	 console.log("in mount");
	 console.log(this.currentUserId.uid);
  }


  // checkLogin = () => {
  //   if (!localStorage.getItem(AppString.ID)) {
  //     this.setState({ isLoading: false }, () => {
  //       this.props.history.push('/')
  //     })
  //   } else {
  //     this.getListUser()
  //   }
  // }

  // getListUser = sync () => {
    // myFirestore.collection("usersPQ").doc("LZ4cQ4PkDgbVLexbavYXmmpzofk1").onSnapshot(function(doc) {
    //     console.log("Current data: ", doc.data());
	// 	this.listUser = doc.data().prevMatchedUsers;
	// 	console.log(this.listUser);
    // });


    // if (result.docs.length > 0) {
    //   this.listUser = [...result.docs]
    //   this.setState({ isLoading: false })
    // }
  // }

  // onLogoutClick = () => {
  //   this.setState({
  //     isOpenDialogConfirmLogout: true
  //   })
  // }

  // doLogout = () => {
  //   this.setState({ isLoading: true })
  //   myFirebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       this.setState({ isLoading: false }, () => {
  //         localStorage.clear()
  //         this.props.showToast(1, 'Logout success')
  //         this.props.history.push('/')
  //       })
  //     })
  //     .catch(function(err) {
  //       this.setState({ isLoading: false })
  //       this.props.showToast(0, err.message)
  //     })
  // }

  // hideDialogConfirmLogout = () => {
  //   this.setState({
  //     isOpenDialogConfirmLogout: false
  //   })
  // }

  // onProfileClick = () => {
  //   this.props.history.push('/profile')
  // }

  renderListUser = async () => {
	// this.getListUser();
	var that = this;
	console.log("in rlu");
	console.log(this.currentUserId);
	myFirestore.collection("usersPQ").doc(this.currentUserId.uid).onSnapshot(function(doc) {
	  	console.log("Current data: ", doc.data());
	  	this.listUser = doc.data().matchedUsers;
	  	console.log(this.listUser);
	  	console.log("Inside renderlistuser1-----" + this.listUser);
    	if (this.listUser && this.listUser.length > 0) {
			console.log("Inside renderlistuser");
      	 	let viewListUser = []
      		this.listUser.forEach((item, index) => {
				console.log("inside for each!!!" + item);
        		if (item.uid !== this.currentUserId) {
					console.log("inside if");
          			viewListUser.push(
	            		<button
							className = 'viewWrapItemFocused'
	              			// className={
	              			//   this.state.currentPeerUser &&
	              			//   this.state.currentPeerUser === item
	              			//     ? 'viewWrapItemFocused'
	              			//     : 'viewWrapItem'
	              			// }
	              			key={item.uid}
	              			onClick={() => {
	                			that.setState({ currentPeerUser: item })
	              			}}
	            		>
			              {/* <img
			                className="viewAvatarItem"
			                src={item.data().photoUrl}
			                alt="icon avatar"
			              /> */}
				              <div className="viewWrapContentItem">
				                <span className="textItem">{
				                  item.user
				                }</span>
				              </div>
			            </button>
          			)
		  			console.log(viewListUser);
        		}
      		});
			console.log("outside for each!");
			console.log(viewListUser[0]);
			that.setState({
				viewListUser1: viewListUser
			});
      		return viewListUser;
    	} else {
      		return null
    	}
	});
  }

  render() {
    return (
      <div className="root1">
		  <Header/>
		  {console.log("below header!")}
		  {console.log(this.state.currentPeerUser)}
        {/* Header */}
        {/* <div className="header">
          <span>MAIN</span>
          <img
            className="icProfile"
            alt="An icon default avatar"
            src={images.ic_default_avatar}
            onClick={this.onProfileClick}
          />
          <img
            className="icLogout"
            alt="An icon logout"
            src={images.ic_logout}
            onClick={this.onLogoutClick}
          />
        </div> */}

        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.state.viewListUser1}</div>

          <div className="viewBoard">
             {this.state.currentPeerUser ? (
              <ChatBoard
                currentPeerUser={this.state.currentPeerUser}
              />
            ) : (
				 (this.state.viewListUser1 ? (<h1>hi</h1>):(<h1>Sorry, you don't have any matches yet...</h1>))

              // <WelcomeBoard
              //   currentUserNickname={this.currentUserNickname}
              //   currentUserAvatar={this.currentUserAvatar}
              // />
            )}
           </div>
        </div>

        {/* Dialog confirm */}
        {/* {this.state.isOpenDialogConfirmLogout ? (
          <div className="viewCoverScreen">
            {this.renderDialogConfirmLogout()}
          </div>
        ) : null} */}

        {/* Loading */}
        {/* {this.state.isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={'spin'}
              color={'#203152'}
              height={'3%'}
              width={'3%'}
            />
          </div>
        ) : null} */}
      </div>
    )
  }

  // renderDialogConfirmLogout = () => {
  //   return (
  //     <div>
  //       <div className="titleDialogConfirmLogout">Are you sure to logout?</div>
  //       <div className="viewWrapButtonDialogConfirmLogout">
  //         <button className="btnYes" onClick={this.doLogout}>
  //           YES
  //         </button>
  //         <button className="btnNo" onClick={this.hideDialogConfirmLogout}>
  //           CANCEL
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }
}

export default Messages;
