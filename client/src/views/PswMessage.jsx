export default function PswMessage({ psw, validPsw }) {

    return (
        !validPsw &&
        <div id="message">
            <div>
                <h3>Password must contain the following:</h3>
                <p id="letter" className={psw.match(/[a-z]/g) ? 'valid' : 'invalid'}>A <b>lowercase</b> letter</p>
                <p id="capital" className={psw.match(/[A-Z]/g) ? 'valid' : 'invalid'}>A <b>capital (uppercase)</b> letter</p>
                <p id="number" className={psw.match(/[0-9]/g) ? 'valid' : 'invalid'}>A <b>number</b></p>
                <p id="length" className={psw.length > 7 ? 'valid' : 'invalid'}>Minimum <b>8 characters</b></p>
            </div>
        </div>
    )
}