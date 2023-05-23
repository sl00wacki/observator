let slideNo = 1;

class Subscriber {
  update(currNo) {
  }
}

class Subscribers extends Subscriber {
  constructor() {
    super();
    this.subscribers = [];
  }
}

class Nav extends Subscriber {
  update(currNo) {
    let current = document.querySelector('[href="#s' + currNo + '"]');
    current.classList.remove('active');
    let next = document.querySelector('[href="#s' + slideNo + '"]');
    next.classList.add('active');
  }
}

class Aside extends Subscriber {
  update(currNo) {
    let aside = document.querySelector('aside');
    let current = aside.querySelectorAll('li')[currNo - 1];
    current.classList.remove('active');
    let next = aside.querySelectorAll('li')[slideNo - 1];
    next.classList.add('active');
  }
}

class Publisher extends Subscribers {
  constructor() {
    super();
    this.nav = new Nav();
    this.aside = new Aside();
    this.subscribe(this.nav);
    this.subscribe(this.aside);
    this.changeSlide();
    window.addEventListener('keyup', this.readKey.bind(this));
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notify(currNo) {
    this.subscribers.forEach(subscriber => {
      subscriber.update(currNo);
    });
  }

  changeSlide(no = null) {
    let currNo = slideNo;
    let current = document.querySelector('[data-slide="' + slideNo + '"]');
    console.log(current);
    current.classList.remove('active');
    if (no == null) {
      slideNo++;
    }
    if (parseInt(no) > 0) {
      slideNo = parseInt(no);
    }
    if (parseInt(no) < 0) {
      slideNo--;
    }
    let next = document.querySelector('[data-slide="' + slideNo + '"]');
    next.classList.add('active');
    this.notify(currNo);
  }

  readKey(e) {
    (e.which == 37) ? this.changeSlide(-1) : null; 
    (e.which == 39) ? this.changeSlide() : null; 
  }
}

const publisher = new Publisher();