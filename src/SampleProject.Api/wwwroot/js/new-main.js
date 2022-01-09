(function ($) {
    const handleSignMessage = (message, publicAddress) => {
        return new Promise((resolve, reject) =>
            ethereum.sendAsync({
                method: 'personal_sign',
                params: [message, publicAddress],
                from: publicAddress,
            }, (err, result) => {
                if (err || result.error) {
                    console.error(err);
                    return reject(result.error);
                }
                let signature = result.result;
                return resolve({ publicAddress, signature, message });
            })
        );
    };

    const handleAuthenticate = ({ publicAddress, signature, message }) => {
        const dataJson = JSON.stringify({
            signer: publicAddress,
            signature: signature,
            message: message,
            hash: '',
        });
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': '/api/token',
            'data': dataJson,
            'dataType': 'json',
            'success': (data) => {
                console.log(data);
            }
        });
    };

    $(document).ready(() => {
        const isMetaMaskInstalled = MetaMaskOnboarding.isMetaMaskInstalled();
        const onboarding = new MetaMaskOnboarding();
        const callToActionButton = $('#callToActionMetamaskButton');
        let accounts;
        const updateButton = () => {
            if (!isMetaMaskInstalled) {
                callToActionButton.html('Click here to install MetaMask!');
                callToActionButton.on('click', (e) => {
                    e.preventDefault();
                    callToActionButton.html('Onboarding in progress');
                    callToActionButton.attr('disabled', 'disabled');
                    onboarding.startOnboarding();
                });
            } else if (accounts && accounts.length > 0) {
                callToActionButton.html('Connecting...');
                callToActionButton.attr('disabled', 'disabled');
                onboarding.stopOnboarding();

                let messageContent = 'Hi, you request a login from client to Eth Jwt Api. Please sign this message. This is not a transaction, is completely free and 100% secure. We\'ll use your signature to prove your ownership over your private key server side.';
                let publicAddress = accounts[0].toLowerCase();

                handleSignMessage(messageContent, publicAddress)
                    .then(handleAuthenticate, () => {
                        accounts = null;
                        callToActionButton.removeAttr('disabled');
                        updateButton();
                    });
            } else {
                callToActionButton.html('Connect to Metamask');
                callToActionButton.on('click', async (e) => {
                    e.preventDefault();
                    accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    });
                    updateButton();
                });
            }
        };
        updateButton();
        if (isMetaMaskInstalled) {
            window.ethereum.on('accountsChanged', (newAccounts) => {
                accounts = newAccounts;
                updateButton();
            });
        }
    });
})(jQuery);