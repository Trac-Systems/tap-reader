# libquickbit

The fastest bit in the West; a library for working with bit fields, accelerated using SIMD on supported hardware.

## API

See [`include/quickbit.h`](include/quickbit.h) for the public API.

### Indexing

Bit fields may be indexed to enable skipping uninteresting portions in effectively constant time. An index is two 128-ary balanced trees of bits with a set bit in a branch indicating that all bits below are the same, either unset or set depending on the tree. An index has a fixed depth of 3 with leaves of the trees being the bit field itself. A single index can therefore contain 128^3 bits (256 KiB). To index more than 256 KiB, several indices may be used.

An index is initialised using `quickbit_index_init()` and maintained using `quickbit_index_update()`:

```c
quickbit_t field = malloc(256 * 1024);

quickbit_index_t index;
quickbit_index_init(index, field, 256 * 1024);

if (quickbit_set(field, 1000000, true)) {
  quickbit_index_update(index, field, 1000000);
}
```

Once an index has been constructed, the `quickbit_skip_first()` and `quickbit_skip_last()` functions may be used to skip portions of the bit field that are not interesting for a given query.

#### Sparse fields

In cases where memory is at a premium, an alternate API is available for indexing sparse bit fields. This API conceptually operates on several `(field, offset)` tuples and assumes that any holes encountered consist of zeros. Other than the representation of the bit field, the sparse API produces indexes that are indentical to those produced by the dense API.

Bit field chunks must be aligned to 128 bit boundaries, must be passed sorted by their byte offset, and must not overlap:

```c
quickbit_chunk_t chunks[2] = {
  {
    .field = malloc(32),
    .len = 32,
    .offset = 0,
  },
  {
    .field = malloc(32),
    .len = 32,
    .offset = 2048,
  },
};

quickbit_index_t index;
quickbit_index_init_sparse(index, chunks, 2);

if (quickbit_set(chunks[1].field, 100, true)) {
  quickbit_index_update_sparse(index, chunks, 2, 2048 * 8 + 100);
}
```

## License

Apache 2.0
