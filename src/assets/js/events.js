import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    // document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
    //     let chatElem = document.querySelector( '#chat-pane' );
    //     let mainSecElem = document.querySelector( '#main-section' );

    //     if ( chatElem.classList.contains( 'chat-opened' ) ) {
    //         chatElem.setAttribute( 'hidden', true );
    //         mainSecElem.classList.remove( 'col-md-9' );
    //         mainSecElem.classList.add( 'col-md-12' );
    //         chatElem.classList.remove( 'chat-opened' );
    //     }

    //     else {
    //         chatElem.attributes.removeNamedItem( 'hidden' );
    //         mainSecElem.classList.remove( 'col-md-12' );
    //         mainSecElem.classList.add( 'col-md-9' );
    //         chatElem.classList.add( 'chat-opened' );
    //     }

    //     //remove the 'New' badge on chat icon (if any) once chat is opened.
    //     setTimeout( () => {
    //         if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
    //             helpers.toggleChatNotificationBadge();
    //         }
    //     }, 300 );
    // } );


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );

    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector( '#err-msg-username' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector( '#err-msg-username' ).innerHTML = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'btn-max' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'btn-mute' ) ) {
            helpers.singleStreamToggleMute( e );
        }
        else if(e.target && e.target.classList.contains('btn-camera')){
            helpers.toggleVideoBtn( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
