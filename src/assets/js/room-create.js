import helpers from './helpers.js';
//When the 'Create room" is button is clicked
document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
    e.preventDefault();

    let roomName = document.querySelector( '#room-name' ).value;
    let yourName = document.querySelector( '#your-name' ).value;

    if ( roomName && yourName ) {
        //remove error message, if any
        document.querySelector( '#err-msg' ).innerHTML = "";

        //save the user's name in sessionStorage
        sessionStorage.setItem( 'username', yourName );

        //create room link
        let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

        //show message with link to room
        document.querySelector( '#room-created' ).innerHTML = roomLink;
        document.querySelector( '#room-created' ).removeAttribute('hidden')
            //Share the room link with your partners.`;

        //empty the values
        document.querySelector( '#room-name' ).value = '';
        document.querySelector( '#your-name' ).value = '';
    }

    else {
        document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
    }
} );

document.getElementById("room-created").addEventListener( 'click', ( e ) => {
    e.preventDefault();
  
    /* Select the text field */
    var emailLink = document.querySelector( '#room-created');
    // var emailLink = document.querySelector('.js-emaillink');
    var range = document.createRange();
    range.selectNode(emailLink);
    window.getSelection().addRange(range);
  
    try {
      // Now that we've selected the anchor text, execute the copy command
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert(msg);
    } catch(err) {
      alert('Oops, unable to copy');
    }
  });

  