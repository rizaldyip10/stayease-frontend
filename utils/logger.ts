const logger = {
  info: (message: string, meta?: object) => {
    console.log(`[INFO] ${message}`, meta ? JSON.stringify(meta) : "");
  },
  error: (message: string, meta?: object) => {
    console.error(`[ERROR] ${message}`, meta ? JSON.stringify(meta) : "");
  },
  warn: (message: string, meta?: object) => {
    console.warn(`[WARN] ${message}`, meta ? JSON.stringify(meta) : "");
  },
  debug: (message: string, meta?: object) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[DEBUG] ${message}`, meta ? JSON.stringify(meta) : "");
    }
  },
};

export default logger;
