import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui.js/faucet';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';

const MY_ADDRESS = '0x26d5b7896686dded4ba38a3194f633aeea2046d2394b4ac1c3fdb0e34e61bfc7';

const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

const balance = (balance: any) => {
	return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
};

const suiBefore = await suiClient.getBalance({
	owner: MY_ADDRESS,
});

await requestSuiFromFaucetV1({
	// use getFaucetHost to make sure you're using correct faucet address
	// you can also just use the address (see Sui TypeScript SDK Quick Start for values)
	host: getFaucetHost('devnet'),
	recipient: MY_ADDRESS,
});



const suiAfter = await suiClient.getBalance({
	owner: MY_ADDRESS,
});
 
// Output result to console.
console.log(
	`Balance before faucet: ${balance(suiBefore)} SUI. Balance after: ${balance(
		suiAfter,
	)} SUI. Hello, SUI!`,
);