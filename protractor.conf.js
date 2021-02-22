exports.config = {
    // launch locally when fields directConnect and seleniumAddress are not provided
    chromeDriver: './src/resources/external-files/executables/chromedriver.exe',
    seleniumServerJar: './src/resources/external-files/drivers/selenium-server-standalone-3.141.59.jar',
    specs: ['./src/resources/temp/jsfiles/test.js'],
    capabilities: {
        browserName: 'chrome'
    }
}