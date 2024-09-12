const hre = require("hardhat");

async function verify(address, args) {
    try {
        return await hre.run("verify:verify", {
            address: address,
            constructorArguments: args,
            contract: "contracts/contractApi.sol:contractApi"
        });
    } catch (e) {
        console.log(address, args, e);
    }
}

async function main() {

    const signers = await hre.ethers.getSigners();
    console.log(signers[0]);
    const contractApi = await hre.ethers.getContractFactory("contractApi", signers[0]);
    const contractApi_ = await contractApi.deploy();
    await contractApi_.deploymentTransaction().wait(6);


    console.log(
        `Contract Address:  ${await contractApi_.deploymentTransaction()}`
    );
    

    console.log(
        `Contract Address:  ${await contractApi_.getAddress()}`
    );

    await verify(await contractApi_.getAddress(), []);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});