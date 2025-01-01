const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, splat } = format;
require('winston-daily-rotate-file');
require('dotenv').config();

const fileTransport = new transports.DailyRotateFile({
    filename: process.env.LOG_FILE_PATH + 'ecics-singpass-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: process.env.LOG_MAX_SIZE || '100m',
    maxFiles: null // keep logs indefinitely
});

const logger = createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
      splat(),
      printf(info => {
        let msg = `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
        if (info[Symbol.for('splat')]) {
          let meta = info[Symbol.for('splat')].filter((data) => typeof data === 'object');
          if (meta.length) { // if there are any objects in the splat, stringify them
            msg += ` - ${JSON.stringify(meta)}`;
          }
        }
        return msg;
      })
    ),
    transports: [
        fileTransport,
        new transports.Console()
    ],
    exitOnError: false
});

module.exports = logger;