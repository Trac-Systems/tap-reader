# Crypto Utils

Wraps the @noble/curves/secp256k1 library and provides a simpler API.

Everything is fully-typed and straight-forward to use. More documentation coming soon!  

## How to Use

### Import

Example import into a browser-based project:
```html
<script src="https://unpkg.com/@cmdcode/crypto-utils"></script>
<script> const { Field, Point, SecretKey, PublicKey } = window.cryptoUtils </script>
```
Example import into a commonjs project:
```ts
const { Field, Point, SecretKey, PublicKey } = require('@cmdcode/crypto-utils')
```
Example import into an ES module project:
```ts
import { Field, Point, SecretKey, PublicKey } from '@cmdcode/crypto-utils'
```

### Field / Point

```ts
// Fields can be created from a variety of types (strings are treated as hex).
type FieldValue = string | number | bigint | Uint8Array | Field
// Points can be created from a variety of types (strings are treated as hex).
type PointValue = string | number | bigint | Uint8Array | Point

class Field extends Uint8Array {
  // Prime N reference.
  static N: bigint;
  // Helper method for efficient modulo operations.
  static mod(x: bigint, n?: bigint): bigint;
  // Helper method for efficient power operations.
  static pow(x: bigint, e: bigint, n?: bigint): bigint;
  // Normalize input values into bytes.
  static normalize(num: FieldValue): Uint8Array;
  // Validate input values (or throw).
  static validate(num: bigint): boolean;

  // Accepts a variety of inputs.
  constructor(x : FieldValue);

  // Convert into a variety of formats.
  get buff()    : Buff;
  get raw()     : Uint8Array;
  get big()     : bigint;
  get hex()     : string;

  // Return point (or x-only point) object.
  get point()   : Point;
  get xpoint()  : Point;

  // Helper attributes.
  get hasOddY() : boolean;
  get negated() : Field;

  // All basic operations are available.
  gt(big: FieldValue)  : boolean;
  lt(big: FieldValue)  : boolean;
  eq(big: FieldValue)  : boolean;
  ne(big: FieldValue)  : boolean;
  add(big: FieldValue) : Field;
  sub(big: FieldValue) : Field;
  mul(big: FieldValue) : Field;
  pow(big: FieldValue) : Field;
  div(big: FieldValue) : Field;
  negate()   : Field;
  generate() : Point;
}

class Point {
  // Prime N reference.
  static N: bigint;

  // Validate input values (or throw).
  static validate(x: PointValue): boolean;

  // Normalize input values into bytes.
  static normalize(x: PointValue): ECPoint;
  
  // Generate a point from a field (scalar) value.
  static generate(value: FieldValue): Point;

  // Helper method for importing coordinates.
  static import(point: Point | ECPoint): Point;

  // Accepts a varity of x-only and compressed key inputs.
  // Will also accept coordinate data (as bigint). 
  constructor(x: PointValue, y?: bigint);

  // Convert into a variety of formats.
  get p()    : ECPoint;
  get x()    : Buff;
  get y()    : Buff;
  get buff() : Buff;       // Returns compressed key.
  get raw()  : Uint8Array; // Returns compressed key.
  get hex()  : string;     // Returns compressed key.

  // Helper attributes.
  get hasEvenY(): boolean;
  get hasOddY(): boolean;

  // Basic math operations available.
  eq(value: PointValue): boolean;
  add(x: PointValue): Point;
  sub(x: PointValue): Point;
  mul(value: PointValue): Point;
  negate(): Point;
}
```

### SecretKey / PublicKey

```ts
class SecretKey extends Uint8Array {
  static random(opt?: KeyOptions): SecretKey;

  constructor(secret: Bytes, options?: KeyOptions);

  get buff(): Buff;
  get raw(): Uint8Array;
  get hex(): string;

  get field(): Field;
  get point(): Point;

  get pub(): PublicKey;

  get hasEvenY(): boolean;
  get hasOddY(): boolean;
  get xfilter(): SecretKey;

  add(bytes: Bytes): SecretKey;
  sub(bytes: Bytes): SecretKey;
  mul(bytes: Bytes): SecretKey;
  div(bytes: Bytes): SecretKey;
  pow(bytes: Bytes): SecretKey;
  negate(): SecretKey;

  sign(message: Bytes, type?: SignatureType): Uint8Array
  verify(signature: Bytes, message: Bytes, type?: SignatureType): boolean

  toWIF(prefix?: number): string;
}

class PublicKey extends Uint8Array {
  static random(opt: KeyOptions): PublicKey;
  static fromSecret(bytes: Bytes, opt: KeyOptions): PublicKey;

  constructor(pubkey: Bytes, options?: KeyOptions);

  get buff(): Buff;
  get raw(): Uint8Array;
  get hex(): string;

  get point(): Point;
  get x(): Buff;
  get y(): Buff;

  get hasEvenY(): boolean;
  get hasOddY(): boolean;

  add(bytes: Bytes): PublicKey;
  sub(bytes: Bytes): PublicKey;
  mul(bytes: Bytes): PublicKey;
  negate(): PublicKey;

  verify(signature: Bytes, message: Bytes, type?: SignatureType): boolean
}
```

## Hash Methods

You can also import the following hash methods:

```ts
import {
  sha256,
  sha512,
  ripe160,
  hash160,
  hash256,
  hmac256,
  hmac512
} from '@cmdcode/crypto-utils'
```

## Development / Testing

This library uses yarn for package management, tape for writing tests, and rollup for cross-platform releases. Here are a few scripts that are useful for development.

```bash
## Compiles types and builds release candidates in /dist folder.
yarn build
## Run any typescript file using real-time compilation.
yarn start contrib/example.ts
## Runs all tests listed in test folder. 
yarn test
## Full macro script for generating a new release candidate.
yarn release
```

## Bugs / Issues

If you run into any bugs or have any questions, please submit an issue ticket.

## Contribution

Feel free to fork and make contributions. Suggestions are welcome!

## License

Use this library however you want!
