{
  'targets': [{
    'target_name': 'crc',
    'include_dirs': [
      '<!(node -e "require(\'napi-macros\')")',
      './vendor/libcrc/include',
    ],
    'dependencies': [
      './vendor/libcrc.gyp:libcrc',
    ],
    'sources': [
      './binding.c',
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
