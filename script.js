let currentLevelIndex = 0;
let difficultySelector = document.getElementById("difficultySelector");

if (localStorage.getItem('premium') == null) {
  localStorage.setItem('premium', 'false')
} else if (localStorage.getItem('premium') == 'true') {
  let title = document.getElementById('premium')
  let premiumtext1 = document.getElementById('premiumtext1')
  let premiumtext2 = document.getElementById('premiumtext2')
  let premiumtext3 = document.getElementById('premiumtext3')
  let premiumtext4 = document.getElementById('premiumtext4')
  title.innerText = 'Premium mode'
  title.style.color = "gold"
  premiumtext1.innerText = 'You already have a premium account.'
  premiumtext2.innerText = 'Thank you for your support!'
  premiumtext3.remove()
  premiumtext4.remove()
  let button = document.getElementById('premiumbutton')
  button.remove()
}

console.log(localStorage.getItem('premium'))

if (localStorage.getItem('generations') == null) {
  localStorage.setItem('generations', 0)
}
if (localStorage.getItem('premium') == 'false') {
  if (localStorage.getItem('generations') >= 5) {
    let passwordInput = document.getElementById("passwords");
  
    passwordInput.style.color = "red";
    passwordInput.innerText = "You can't do more than 5 generations in an hour without a premium account. Go to the premium page for details.";
  }
}


console.log(localStorage.getItem('generations'))

let passwordLevels = [
  {
    level: "Easy",
    charset: "abcdefghijklmnopqrstuvwxyz",
    length: 8
  },
  {
    level: "Medium",
    charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    length: 12
  },
  {
    level: "Hard",
    charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
    length: 15
  }
];


function changeDifficulty(difficulty) {

  for (let i = 0; i < passwordLevels.length; i++) {
    if (passwordLevels[i].level === difficulty) {
      currentLevelIndex = i;
      break;
    }
  }

  runPassword();
}

function checkPremium() {
  if (localStorage.getItem('premium') == 'true') {
    let title = document.getElementById('premium')
    let premiumtext1 = document.getElementById('premiumtext1')
    let premiumtext2 = document.getElementById('premiumtext2')
    let premiumtext3 = document.getElementById('premiumtext3')
    let premiumtext4 = document.getElementById('premiumtext4')
    title.innerText = 'Premium mode'
    title.style.color = "gold"
    premiumtext1.innerText = 'You already have a premium account.'
    premiumtext2.innerText = 'Thank you for your support!'
    premiumtext3.remove()
    premiumtext4.remove()
    let button = document.getElementById('premiumbutton')
    button.remove()
  }
}

function setPremium() {
  localStorage.setItem('premium', true)
  let title = document.getElementById('premium')
  let premiumtext1 = document.getElementById('premiumtext1')
  let premiumtext2 = document.getElementById('premiumtext2')
  let premiumtext3 = document.getElementById('premiumtext3')
  let premiumtext4 = document.getElementById('premiumtext4')
  title.innerText = 'Premium mode'
  title.style.color = "gold"
  premiumtext1.innerText = 'Thank you for supporting us.'
  premiumtext2.innerText = 'You now have a premium account and are able to use our service without any restrictions!'
  premiumtext3.remove()
  premiumtext4.remove()
  let button = document.getElementById('premiumbutton')
  button.remove()
}

function showPasswordContainer() {
  if (passwordContainer1.style.display === "none") {
    passwordContainer1.style.display = "block";
    passwordInput2.value = "";
  } else if (passwordContainer2.style.display === "none") {
    passwordContainer2.style.display = "block";
    passwordInput3.value = "";
  } else {}
}

function generate(charset, length) {
  let buffer = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    buffer += charset.charAt(randomIndex);
    console.log(buffer);
  }
  return buffer;
}

function generatePassword(amount) {
  let passwordInput = document.getElementById("passwords");
  passwordInput.innerText = "";
  passwordInput.style.color = "black";

  let level = passwordLevels[currentLevelIndex];
      let length = level.length;
      let charset = level.charset;
      amount = parseInt(amount);
      console.log(amount);
      let finalpassword = "";
      for (let i = 0; i < amount; i++) {
        
        finalpassword += generate(charset, length) + "\n";
        
        console.log(finalpassword)
      }
      passwordInput.innerText += finalpassword;
      let genBuffer = localStorage.getItem('generations');
      let genamount = parseInt(genBuffer) + 1;
  
      localStorage.setItem('generations', genamount)
}

function runPassword() {
  let passwordInput = document.getElementById("passwords");

  
  let amountInput = document.getElementById("amount");
  let amount = amountInput.value;

  if (localStorage.getItem('premium') == 'false') {
    if (localStorage.getItem('generations') >= 5) {
      if (localStorage.getItem('ban') == null) {
        let d = new Date();
        let time = d.getTime();
        localStorage.setItem('ban', time)
      }
      let d = new Date(); 
      let currentTime = d.getTime()
      if ((currentTime - localStorage.getItem('ban')) >= 3600000) {
        localStorage.setItem('generations', 0)
        localStorage.removeItem('ban')
        generatePassword(amount)
      } else  {
        passwordInput.style.color = "red";
        passwordInput.innerText = "You can't do more than 5 generations in an hour without a premium account. Go to the premium page for details.";
      }
    } else {
      if (amount > 3) {
        passwordInput.style.color = "red";
        passwordInput.innerText = "You can't create more than 3 passwords simultaneously without a premium account. Go to the premium page for details.";
        
      } else if (amount < 1) {
        passwordInput.style.color = "red";
        passwordInput.innerText = "We can't create less than 1 password...";
      } else {
        generatePassword(amount);
      }
    } 
  } else if (amount < 1) {
      passwordInput.style.color = "red";
      passwordInput.innerText = "We can't create less than 1 password...";

  } else {
    generatePassword(amount);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var Link1 = document.querySelector('.nav-link[href="about.html"]');
  Link1.addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add('fade-in');
    setTimeout(function() {
      window.location.href = Link1.href;
      window.location.href = Link2.href;
    }, 300);
  });

  var Link2 = document.querySelector('.nav-link[href="index.html"]');
  Link2.addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add('fade-in');
    setTimeout(function() {
      window.location.href = Link2.href;
    }, 500);
  });
});
