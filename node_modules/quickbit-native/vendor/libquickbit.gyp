{
  'targets': [{
    'target_name': 'libquickbit',
    'type': 'static_library',
    'include_dirs': [
      './libquickbit/vendor/libsimdle/include',
    ],
    'sources': [
      './libquickbit/src/quickbit.c',
      './libquickbit/vendor/libsimdle/src/extern.c',
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
