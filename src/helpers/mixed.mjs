function printConsole( { topic, value, secondLineValue } ) {
    const space = new Array( 26 - topic.length ).fill( " " ).join( "" )

    console.log( `${topic}${space}${value}` )
    if( secondLineValue !== undefined ) {
        const n = new Array( 26 ).fill( " " ).join( "" )
        console.log( `${n}${secondLineValue}` )
    }

    return true
}


export { printConsole }