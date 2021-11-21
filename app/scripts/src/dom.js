let $ = require('jquery');
let md5 = require('crypto-js/md5');

function createGravatarUrl(username) {
  let userhash = md5(username);
  userhash = userhash.toString();
  return `http://www.gravatar.com/avatar/${userhash}`;
}

export function promptForUsername() {
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formId, inputId) {
    this.formId = formId;
    this.inputId = inputId;
  }
  
  init(submitCallback) {
    $(this.formId).submit((event) => {
      event.preventDefault();
      let val = $(this.inputId).val();
      submitCallback(val);
      $(this.inputId).val('');
    });
    $(this.formId).find('button').on('click', () => {
      $(this.formId).submit();
    });
  }
}

export class ChatList {
  constructor(listId, username) {
    this.listId = listId;
    this.odd = false;
    this.username = username;
  }
  
  init() {
      this.timer = setInterval(() => {
        $('[data-time]').each((idx, element) => {
        let $element = $(element);
        let timestamp = new Date().setTime($element.attr('data-time'));
        let ago = moment(timestamp).fromNow();
        $element.html(ago);
      });
    }, 1000);
  }

  drawMessage({user: u, timestamp: t, message: m}) {
    let $messageRow = $('<li>', {
      class: 'message-row'
    });
    
    if (this.username === u) {
      $messageRow.addClass('me');
    }

    else {
      $messageRow.addClass('others');
    }
    
    let $message = $('<p>');
    $message.append($('<span>', {
      class: 'message-username',
      text: u
    }));
    
    $message.append($('<span>', {
      class: 'timestamp',
      'data-time': t,
    text: moment(t).fromNow()
    }));

    $message.append($('<span>', {
      class: 'message-message',
    text: m
    }));

    $messageRow.append($message);

    var $img = $('<img>', {
      src: createGravatarUrl(u),
      title: u
    });
    $messageRow.append($img);

    $(this.listId).append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }
}
