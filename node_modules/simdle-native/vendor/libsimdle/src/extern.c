#include "../include/simdle.h"

extern bool
simdle_allo_v128 (simdle_v128_t vec);

extern bool
simdle_allz_v128 (simdle_v128_t vec);

extern simdle_v128_t
simdle_and_v128_u8 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_and_v128_u16 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_and_v128_u32 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_clear_v128_u8 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_clear_v128_u16 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_clear_v128_u32 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_clo_v128_u8 (simdle_v128_t vec);

extern simdle_v128_t
simdle_clo_v128_u16 (simdle_v128_t vec);

extern simdle_v128_t
simdle_clo_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_clz_v128_u8 (simdle_v128_t vec);

extern simdle_v128_t
simdle_clz_v128_u16 (simdle_v128_t vec);

extern simdle_v128_t
simdle_clz_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_cnt_v128_u8 (simdle_v128_t vec);

extern simdle_v128_t
simdle_cnt_v128_u16 (simdle_v128_t vec);

extern simdle_v128_t
simdle_cnt_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_cto_v128_u8 (simdle_v128_t vec);

extern simdle_v128_t
simdle_cto_v128_u16 (simdle_v128_t vec);

extern simdle_v128_t
simdle_cto_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_ctz_v128_u8 (simdle_v128_t vec);

extern simdle_v128_t
simdle_ctz_v128_u16 (simdle_v128_t vec);

extern simdle_v128_t
simdle_ctz_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_load_v128_u8 (const uint8_t arr[]);

extern simdle_v128_t
simdle_load_v128_u16 (const uint16_t arr[]);

extern simdle_v128_t
simdle_load_v128_u32 (const uint32_t arr[]);

extern simdle_v128_t
simdle_not_v128_u8 (simdle_v128_t vec);

extern simdle_v128_t
simdle_not_v128_u16 (simdle_v128_t vec);

extern simdle_v128_t
simdle_not_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_or_v128_u8 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_or_v128_u16 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_or_v128_u32 (simdle_v128_t a, simdle_v128_t b);

extern void
simdle_store_v128_u8 (uint8_t arr[], simdle_v128_t vec);

extern void
simdle_store_v128_u16 (uint16_t arr[], simdle_v128_t vec);

extern void
simdle_store_v128_u32 (uint32_t arr[], simdle_v128_t vec);

extern uint16_t
simdle_sum_v128_u8 (simdle_v128_t vec);

extern uint32_t
simdle_sum_v128_u16 (simdle_v128_t vec);

extern uint64_t
simdle_sum_v128_u32 (simdle_v128_t vec);

extern simdle_v128_t
simdle_xor_v128_u8 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_xor_v128_u16 (simdle_v128_t a, simdle_v128_t b);

extern simdle_v128_t
simdle_xor_v128_u32 (simdle_v128_t a, simdle_v128_t b);
