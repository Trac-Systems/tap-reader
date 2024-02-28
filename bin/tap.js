#!/usr/bin/env node

async function main( args ) {
    const { CLI } = await import( '../src/CLI.mjs' );
    const cli = new CLI();
    await cli.start();
    return true
}

main()
    .then( a => a )
    .catch( e => console.log( e ) )