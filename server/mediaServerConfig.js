const { 
  RTMP_PORT,
  RTMP_CHUNK_SIZE,
  RTMP_GOP_CACHE,
  RTMP_PING,
  RTMP_PING_TIMEOUT,
  RTMP_HTTP_PORT,
  RTMP_ALLOW_ORIGIN,
  RTMP_HTTP_USER,
  RTMP_HTTP_PASS
} = process.env;

const mediaServerConfig = {
  rtmp: {
    port: RTMP_PORT,
    chunk_size: RTMP_CHUNK_SIZE,
    gop_cache: RTMP_GOP_CACHE,
    ping: RTMP_PING,
    ping_timeout: RTMP_PING_TIMEOUT
  },
  http: {
    port: RTMP_HTTP_PORT,
    allow_origin: RTMP_ALLOW_ORIGIN,
  },
  auth: {
    api : true,
    api_user: RTMP_HTTP_USER,
    api_pass: RTMP_HTTP_PASS,
  }
};

module.exports = mediaServerConfig;
