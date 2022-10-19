const style = () => {
    return {
        'background': 'white',
        'padding': '10px 20px',
        'color': 'red',
        'textAlign': 'center',
        'marginBottom': '16px',
        'borderRadius': '4px',
        'border': '1px solid red',
    }
}

export default function EmailTaken() {
    return (
        <div style={style()}>Email is already in use</div>
    )
}