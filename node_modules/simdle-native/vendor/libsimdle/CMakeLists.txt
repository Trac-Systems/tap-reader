cmake_minimum_required(VERSION 3.22)

project(simdle C)

add_library(simdle OBJECT)

set_target_properties(
  simdle
  PROPERTIES
  C_STANDARD 99
  POSITION_INDEPENDENT_CODE ON
)

target_sources(
  simdle
  INTERFACE
    include/simdle.h
    include/simdle/allo.h
    include/simdle/allz.h
    include/simdle/and.h
    include/simdle/arch.h
    include/simdle/clear.h
    include/simdle/clo.h
    include/simdle/clz.h
    include/simdle/cnt.h
    include/simdle/cto.h
    include/simdle/ctz.h
    include/simdle/load.h
    include/simdle/not.h
    include/simdle/or.h
    include/simdle/store.h
    include/simdle/sum.h
    include/simdle/vec.h
    include/simdle/xor.h
  PRIVATE
    src/extern.c
)

target_include_directories(
  simdle
  PUBLIC
    include
)

add_library(simdle_shared SHARED $<TARGET_OBJECTS:simdle>)

set_target_properties(
  simdle_shared
  PROPERTIES
  OUTPUT_NAME simdle
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

add_library(simdle_static STATIC $<TARGET_OBJECTS:simdle>)

set_target_properties(
  simdle_static
  PROPERTIES
  OUTPUT_NAME simdle
  PREFIX lib
)

install(TARGETS simdle_shared simdle_static)

install(FILES include/simdle.h DESTINATION include)

install(DIRECTORY include/simdle DESTINATION include)

if(PROJECT_IS_TOP_LEVEL)
  enable_testing()
  add_subdirectory(test)
endif()
