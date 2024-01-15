cmake_minimum_required(VERSION 3.25)

project(quickbit_native C)

include(bare)

if(NOT TARGET quickbit)
  add_subdirectory(vendor/libquickbit EXCLUDE_FROM_ALL)
endif()

add_bare_module(quickbit_native)

target_sources(
  quickbit_native
  PRIVATE
    binding.c
)

target_include_directories(
  quickbit_native
  PUBLIC
    $<TARGET_PROPERTY:quickbit,INTERFACE_INCLUDE_DIRECTORIES>
)

target_link_libraries(
  quickbit_native
  PUBLIC
    quickbit_static
)
