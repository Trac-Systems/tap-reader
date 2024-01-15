cmake_minimum_required(VERSION 3.25)

project(udx_native C)

include(bare)

add_bare_dependencies()

if(NOT TARGET udx)
  add_subdirectory(vendor/libudx EXCLUDE_FROM_ALL)
endif()

add_bare_module(udx_native)

target_sources(
  udx_native
  PRIVATE
    binding.c
)

target_include_directories(
  udx_native
  PUBLIC
    $<TARGET_PROPERTY:udx,INTERFACE_INCLUDE_DIRECTORIES>
)

target_link_libraries(
  udx_native
  PUBLIC
    udx
)
