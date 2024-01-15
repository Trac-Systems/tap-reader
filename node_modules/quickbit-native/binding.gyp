{
  'targets': [{
    'target_name': 'quickbit',
    'include_dirs': [
      '<!(node -e "require(\'napi-macros\')")',
      './vendor/libquickbit/include',
    ],
    'dependencies': [
      './vendor/libquickbit.gyp:libquickbit',
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
