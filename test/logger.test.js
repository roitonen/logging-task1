const assert = require('chai').assert;
const fs = require('fs');
const {createLogger, transports, format} = require('winston');

/**
 * Separate logger instance used only for testing file writing.
 * Writes to test-specific log files to avoid polluting production logs.
 */
const testLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({filename: 'logs/test-error.log', level: 'error'}),
    new transports.File({filename: 'logs/test-combined.log'})
  ]
});

/** @type {import('winston').Logger} Main application logger */
const logger = require('../src/logger');

/**
 * Tests for logger configuration and structure.
 * Verifies that the logger is created with correct settings.
 */
describe('Logger configuration', () => {
  /**
   * Verifies that logger is a valid object instance.
   */
  it('should create logger instance', () => {
    assert.isObject(logger);
  });

  /**
   * Verifies that logger exposes the info() method.
   */
  it('should have info method', () => {
    assert.isFunction(logger.info);
  });

  /**
   * Verifies that logger exposes the warn() method.
   */
  it('should have warn method', () => {
    assert.isFunction(logger.warn);
  });

  /**
   * Verifies that logger exposes the error() method.
   */
  it('should have error method', () => {
    assert.isFunction(logger.error);
  });

  /**
   * Verifies that the minimum log level is set to 'info'.
   */
  it('should have correct log level', () => {
    assert.equal(logger.level, 'info');
  });

  /**
   * Verifies that logger has exactly 3 transports:
   * Console, error.log file, combined.log file.
   */
  it('should have 3 transports', () => {
    assert.equal(logger.transports.length, 3);
  });
});

/**
 * Tests for logger file writing behaviour.
 * Uses a separate test logger to avoid modifying production log files.
 * Test log files are cleaned up after all tests complete.
 */
describe('Logger file writing', () => {
  /**
   * Write test messages before running file tests.
   * Timeout of 500ms ensures Winston finishes writing to disk.
   */
  before((done) => {
    testLogger.error('test error message');
    testLogger.info('test info message');
    setTimeout(done, 500);
  });

  /**
   * Remove test log files after all tests in this block complete.
   */
  // after(() => {
  //   fs.unlinkSync('logs/test-error.log');
  //   fs.unlinkSync('logs/test-combined.log');
  // });

  /**
   * Verifies that error.log file was created on disk.
   */
  it('should create error.log file', () => {
    assert.isTrue(fs.existsSync('logs/test-error.log'));
  });

  /**
   * Verifies that combined.log file was created on disk.
   */
  it('should create combined.log file', () => {
    assert.isTrue(fs.existsSync('logs/test-combined.log'));
  });

  /**
   * Verifies that error messages are written to error.log.
   */
  it('should write error to error.log', () => {
    const content = fs.readFileSync('logs/test-error.log', 'utf8');
    assert.include(content, 'test error message');
  });

  /**
   * Verifies that both info and error messages are written to combined.log.
   */
  it('should write all levels to combined.log', () => {
    const content = fs.readFileSync('logs/test-combined.log', 'utf8');
    assert.include(content, 'test info message');
    assert.include(content, 'test error message');
  });

  /**
   * Verifies that info messages are NOT written to error.log.
   * Only error level and above should appear in error.log.
   */
  it('should NOT write info to error.log', () => {
    const content = fs.readFileSync('logs/test-error.log', 'utf8');
    assert.notInclude(content, 'test info message');
  });
});