cmake_minimum_required(VERSION 3.22)

project(crc C)

set(CRC_FORCE_FALLBACK OFF CACHE BOOL "Force the use of a software implementation of CRC")

add_library(crc OBJECT)

set_target_properties(
  crc
  PROPERTIES
  C_STANDARD 99
  POSITION_INDEPENDENT_CODE ON
)

target_sources(
  crc
  INTERFACE
    include/crc.h
  PRIVATE
    src/arch.h
    src/arm.c
    src/endian.c
    src/endian.h
    src/generic.c
    src/lookup.c
    src/lookup.h
)

target_include_directories(
  crc
  PUBLIC
    include
)

if(CRC_FORCE_FALLBACK)
  target_compile_definitions(
    crc
    PRIVATE
      CRC_FORCE_FALLBACK
  )
endif()

add_library(crc_shared SHARED $<TARGET_OBJECTS:crc>)

set_target_properties(
  crc_shared
  PROPERTIES
  OUTPUT_NAME crc
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

add_library(crc_static STATIC $<TARGET_OBJECTS:crc>)

set_target_properties(
  crc_static
  PROPERTIES
  OUTPUT_NAME crc
)

install(TARGETS crc_shared crc_static)

install(FILES include/crc.h DESTINATION include)

if(PROJECT_IS_TOP_LEVEL)
  enable_testing()
  add_subdirectory(test)
endif()
