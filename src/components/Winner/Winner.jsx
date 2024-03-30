import PropTypes from "prop-types";

const Winner = ({gameContract}) => {
    return (
        <legend>
            Game over!
            You can check winner here:
            <a 
                href={`https://sepolia.etherscan.io/address/${gameContract}#internaltx`}
                target="_blank"
            >
                {gameContract}
            </a>
        </legend>
    );
};

Winner.propTypes = {
    gameContract: PropTypes.string,
};

export default Winner;