cmake_minimum_required(VERSION 3.22)

project(quickbit C)

if(NOT TARGET simdle)
  add_subdirectory(vendor/libsimdle EXCLUDE_FROM_ALL)
endif()

add_library(quickbit OBJECT)

set_target_properties(
  quickbit
  PROPERTIES
  C_STANDARD 99
  POSITION_INDEPENDENT_CODE ON
)

target_sources(
  quickbit
  INTERFACE
    include/quickbit.h
  PRIVATE
    src/quickbit.c
)

target_include_directories(
  quickbit
  PUBLIC
    include
  PRIVATE
    $<TARGET_PROPERTY:simdle,INTERFACE_INCLUDE_DIRECTORIES>
)

add_library(quickbit_shared SHARED $<TARGET_OBJECTS:quickbit>)

set_target_properties(
  quickbit_shared
  PROPERTIES
  OUTPUT_NAME quickbit
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_link_libraries(
  quickbit_shared
  PUBLIC
    simdle_shared
)

add_library(quickbit_static STATIC $<TARGET_OBJECTS:quickbit>)

set_target_properties(
  quickbit_static
  PROPERTIES
  OUTPUT_NAME quickbit
  PREFIX lib
)

target_link_libraries(
  quickbit_static
  PUBLIC
    simdle_static
)

install(TARGETS quickbit_shared quickbit_static)

install(FILES include/quickbit.h DESTINATION include)

if(PROJECT_IS_TOP_LEVEL)
  enable_testing()
  add_subdirectory(test)
endif()
