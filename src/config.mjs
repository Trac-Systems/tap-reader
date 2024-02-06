export default {
  "enableRest": process.env.ENABLE_REST === 'true' ? true : false || true, 
  "restPort": parseInt(process.env.REST_PORT) || 5099, 
  "enableMetricsExporter": process.env.ENABLE_METRICS === 'true' ? true : false || true, 
  "metricsPort": parseInt(process.env.METRICS_PORT) || 13337, 
  "enableWebsockets": process.env.ENABLE_WEBSOCKETS === 'true' ? true : false || false, 
  "websocketPort": parseInt(process.env.WEBSOCKET_PORT) || 5095, 
  "websocketCORS": process.env.WEBSOCKET_CORS || "*", 
  "channel": process.env.CHANNEL || "53d2e64fa7a09e9dc74fc52ee9e9feb9d59b3e2cff4a25dfb543ec3b0bf4b281", 
  "channelTest": process.env.CHANNEL_TEST || "729c91276e20b8e270ea589ac437f24e6c7c66c969b4acfe99bd82faab391e68" 
};