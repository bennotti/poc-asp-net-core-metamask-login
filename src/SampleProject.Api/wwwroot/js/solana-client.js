(function ($) {
    let walletAddress = null;
    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window;

            if (solana) {
                if (solana.isPhantom) {
                    console.log('Phantom wallet found!');
                    const response = await solana.connect({ onlyIfTrusted: true });
                    console.log(
                        'Connected with Public Key:',
                        response.publicKey.toString()
                    );
                    walletAddress = response.publicKey.toString();
                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet 👻');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const connectWallet = async (callToActionButton) => {
        const { solana } = window;

        if (solana) {
            const response = await solana.connect();
            console.log('Connected with Public Key:', response.publicKey.toString());
            walletAddress = response.publicKey.toString();
            callToActionButton.hide();
        }
    };


    $(document).ready(() => {
        const callToActionButton = $('#callToActionPhantomButton');
        callToActionButton.hide();
        callToActionButton.on('click', (e) => {
            e.preventDefault();
            connectWallet(callToActionButton);
        });
        const onLoad = async () => {
            await checkIfWalletIsConnected();
            if (!walletAddress) {
                callToActionButton.show();
            }
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    });
})(jQuery);