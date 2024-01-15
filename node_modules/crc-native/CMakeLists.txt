cmake_minimum_required(VERSION 3.25)

project(crc_native C)

include(bare)

if(NOT TARGET crc)
  add_subdirectory(vendor/libcrc EXCLUDE_FROM_ALL)
endif()

add_bare_module(crc_native)

target_sources(
  crc_native
  PRIVATE
    binding.c
)

target_include_directories(
  crc_native
  PUBLIC
    $<TARGET_PROPERTY:crc,INTERFACE_INCLUDE_DIRECTORIES>
)

target_link_libraries(
  crc_native
  PUBLIC
    crc_static
)
