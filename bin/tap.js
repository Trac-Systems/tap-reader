#!/usr/bin/env node 

const { fileURLToPath } = require( 'url' );
const path = require( 'path' );


async function main( args ) {
    const __dirname = path.dirname( __filename )
    const parentDirectory = path.join( __dirname, '..' )
    process.env.NODE_CONFIG_DIR = `${parentDirectory}/config/`
    const { CLI } = await import( '../src/CLI.mjs' );
    const cli = new CLI();
    await cli.start();

    return true
}

main()
    .then( a => a )
    .catch( e => console.log( e ) )