{
  'targets': [{
    'target_name': 'libcrc',
    'type': 'static_library',
    'sources': [
      './libcrc/src/arm.c',
      './libcrc/src/endian.c',
      './libcrc/src/generic.c',
      './libcrc/src/lookup.c',
    ],
    'configurations': {
      'Debug': {
        'defines': ['DEBUG'],
      },
      'Release': {
        'defines': ['NDEBUG'],
      },
    },
  }]
}
