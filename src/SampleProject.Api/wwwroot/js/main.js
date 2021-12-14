let userLoginData = {
  state: "loggedOut",
  ethAddress: "",
  buttonText: "Log in",
  publicName: "",
  JWT: "",
  config: { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
}

var backendPath = 'https://localhost:44343/';

(function ($) {
    $(document).ready(() => {
        const isMetaMaskInstalled = () => {
            //Have to check the ethereum binding on the window object to see if it's installed
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };

        console.log('isMetaMaskInstalled: ', isMetaMaskInstalled())
    });
})(jQuery)

// https://medium.com/valist/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
const ethEnabled = async () => {
    console.log('ok')
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    // return true;
    ethInit();
  }
  return false;
}

function ethInit() {
  ethereum.on('accountsChanged', (_chainId) => ethNetworkUpdate());

  async function ethNetworkUpdate() {      
    let accountsOnEnable = await web3.eth.getAccounts();
    let address = accountsOnEnable[0];
    address = address.toLowerCase();
    if (userLoginData.ethAddress != address) {
      userLoginData.ethAddress = address;
      showAddress();
      if (userLoginData.state == "loggedIn") {
        userLoginData.JWT = "";
        userLoginData.state = "loggedOut";
        userLoginData.buttonText = "Log in";
      }
    }
    if (userLoginData.ethAddress != null && userLoginData.state == "needLogInToMetaMask") {
      userLoginData.state = "loggedOut";
    }
  }
}


// Show current msg
function showMsg(id) {
  let x = document.getElementsByClassName("user-login-msg");
  let i;
  for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
  }
  document.getElementById(id).style.display = 'block';
}


// Show current address
function showAddress() {
  document.getElementById('ethAddress').innerHTML = userLoginData.ethAddress;
}


// Show current button text
function showButtonText() {
  document.getElementById('buttonText').innerHTML = userLoginData.buttonText;
}


async function userLoginOut() {
  if(userLoginData.state == "loggedOut" || userLoginData.state == "needMetamask") {
    await onConnectLoadWeb3Modal();
  }
  if (web3ModalProv) {
    window.web3 = web3ModalProv;
    try {
      userLogin();
    } catch (error) {
      console.log(error);
      userLoginData.state = 'needLogInToMetaMask';
      showMsg(userLoginData.state);
      return;
    }
  }
  else {
    userLoginData.state = 'needMetamask';
    return;
  }
}


async function userLogin() {
  if (userLoginData.state == "loggedIn") {
    userLoginData.state = "loggedOut";
    showMsg(userLoginData.state);
    userLoginData.JWT = "";
    userLoginData.buttonText = "Log in";
    showButtonText();
    return;
  }
  if (typeof window.web3 === "undefined") {
    userLoginData.state = "needMetamask";
    showMsg(userLoginData.state);
    return;
  }
  let accountsOnEnable = await web3.eth.getAccounts();
  let address = accountsOnEnable[0];
  address = address.toLowerCase();
  if (address == null) {
    userLoginData.state = "needLogInToMetaMask";
    showMsg(userLoginData.state);
    return;
  }
  userLoginData.state = "signTheMessage";
  showMsg(userLoginData.state);

  let messageContent = 'Hi, you request a login from client to Eth Jwt Api. Please sign this message. This is not a transaction, is completely free and 100% secure. We\'ll use your signature to prove your ownership over your private key server side.';
  let publicAddress = address;
  // let hash = ethUtil.bufferToHex(ethUtil.keccak256("\x19Ethereum Signed Message:\n" + plain.length + plain));
  handleSignMessage(messageContent, publicAddress).then(handleAuthenticate);

  function handleSignMessage(message, publicAddress) {
    return new Promise((resolve, reject) =>  
        web3.currentProvider.sendAsync({
          method: 'personal_sign',
          params: [messageContent, address],
          from: address,
      }, function (err, result) {
        if (err || result.error) {
            login_btn.removeAttribute('disabled');
            login_btn.innerHTML = 'Login';

            console.error(err);
            return console.error(result.error);
        }
        console.log({
            'signature': result.result,
            'msg': messageContent
        });
        let signature = result.result;
        return resolve({ publicAddress, signature });
      })
    );
  }

  function handleAuthenticate({ publicAddress, signature }) {
    axios
      .post(
        backendPath+"api/token",
        {
          signer: publicAddress,
          signature: signature,
          message: messageContent,
          hash: '',
        },
        {
          'Content-type': 'application/json'
        }
      )
      .then(function(response) {
        console.log(response);
        if (response.data[0] == "Success") {
          userLoginData.state = "loggedIn";
          showMsg(userLoginData.state);
          userLoginData.buttonText = "Log out";
          showButtonText();
          userLoginData.ethAddress = address;
          showAddress();
          userLoginData.publicName = response.data[1];
          getPublicName();
          userLoginData.JWT = response.data[2];
          // Clear Web3 wallets data for logout
          localStorage.clear();
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
} 


function getPublicName() {
  document.getElementById('updatePublicName').value = userLoginData.publicName;
}


function setPublicName() {
  let value = document.getElementById('updatePublicName').value;
  axios.post(
    backendPath+"server/ajax.php",
    {
      request: "updatePublicName",
      address: userLoginData.ethAddress,
      JWT: userLoginData.JWT,
      publicName: value
    },
    this.config
  )
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.error(error);
  });
}