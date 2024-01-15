{
  'targets': [{
    'target_name': 'libsimdle',
    'type': 'static_library',
    'sources': [
      './libsimdle/src/extern.c',
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
