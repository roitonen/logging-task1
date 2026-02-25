## Description

This project implements application logging in Node.js using the Winston library.The logger is configured to write messages to the console and two log files simultaneously:

- `logs/error.log` — error level messages only
- `logs/combined.log` — all log levels (info, warn, error)

---

## Technology Stack

- **Runtime:** Node.js
- **Logging:** Winston 3.11.0
- **Testing:** Mocha, Chai

---

## Project Structure

```
.
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── LICENSE
├── logs/                # Logs
├── src/
│   ├── logger.js        # Winston logger configuration
│   └── main.js          # Main application entry point
└── test/
    └── logger.test.js   # Unit tests for the logger
```

---

## How to Run

### 1. Clone the repository

```
git clone https://github.com/roitonen/logging-task1.git
cd logging-task1
```

### 2. Install dependencies

```
npm install
```

### 3. Run the application

```
npm start
```

### 4. Run tests

```
npm test
```

---

## Usage

After running `npm start`, log output appears in the console and in the `logs/` directory:

**Console output:**

```
{"level":"info","message":"This is an informational message.","timestamp":"2026-02-23T00:03:31.707Z"}
{"level":"warn","message":"This is a warning message.","timestamp":"2026-02-23T00:03:31.709Z"}
{"level":"error","message":"This is an error message.","timestamp":"2026-02-23T00:03:31.709Z"}
{"level":"info","message":"This is another informational message.","timestamp":"2026-02-23T00:03:31.710Z"}
{"level":"warn","message":"This is another warning message.","timestamp":"2026-02-23T00:03:31.710Z"}
{"level":"error","message":"This is another error message.","timestamp":"2026-02-23T00:03:31.710Z"}
```

**logs/error.log** — contains only error level messages:

```json
{"level":"error","message":"This is an error message.","timestamp":"..."}
{"level":"error","message":"This is another error message.","timestamp":"..."}
```

**logs/combined.log** — contains all log levels:

```json
{"level":"info","message":"This is an informational message.","timestamp":"..."}
{"level":"warn","message":"This is a warning message.","timestamp":"..."}
{"level":"error","message":"This is an error message.","timestamp":"..."}
```

---

## Tests

The project includes unit tests covering two areas:

**Logger configuration** — verifies the logger is set up correctly:

- Logger instance is created
- Methods `info`, `warn`, `error` exist
- Log level is set to `info`
- 3 transports are configured (Console, error.log, combined.log)

**Logger file writing** — verifies actual file writing behaviour:

- Log files are created on disk
- Error messages are written to `error.log`
- All levels are written to `combined.log`
- Info messages are NOT written to `error.log`

Tests use a separate test logger that writes to temporary files (`test-error.log`, `test-combined.log`) which are automatically deleted after tests complete.

### Test Results

```

Logger configuration
  ✔ should create logger instance
  ✔ should have info method
  ✔ should have warn method
  ✔ should have error method
  ✔ should have correct log level
  ✔ should have 3 transports

Logger file writing
  ✔ should create error.log file
  ✔ should create combined.log file
  ✔ should write error to error.log
  ✔ should write all levels to combined.log
  ✔ should NOT write info to error.log

11 passing (XXXms)
```

---

## License

This project is licensed under the MIT License — see the LICENSE file for details.
